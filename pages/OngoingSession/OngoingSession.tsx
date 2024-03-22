import * as React from "react";
import {
  VStack,
  Text,
  Input,
  InputField,
  Heading,
  HStack,
} from "@gluestack-ui/themed";
import { useNavigate, useParams } from "react-router-native";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { WorkoutWithExercises } from "../../types/workout";
import CurrentExerciseInput from "./components/CurrentExerciseInput";
import { Exercise, SetData } from "../../types/exercise";

const OngoingSessionPage = () => {
  // useParams = recuperer les parametres de la route (ici on a workoutId et sessionId)
  // se referer a App pour les voir
  const params = useParams();
  // useNavigate : renvoie une fonction qui servira a se deplacer entre les pages
  const navigate = useNavigate();

  // useApi : notre hook qui nous permettra de faire des appels api avec la fonction request qu'il nous donne
  const { request, isLoading, errorMessage } = useApi();
  // workout : on va stocker tout le workout, ce qui nous servira a récuperer la liste de ses exos
  const [workout, setWorkout] = useState<WorkoutWithExercises | null>(null);
  // quel exercise on est en train de faire ?
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  // liste des exos finis
  const [completedExercises, setCompletedExercises] = useState<Array<string>>(
    [],
  );

  const canGoToNextExercise = () => {
    if (!workout || !workout.exercises.length) {
      return false;
    } else {
      if (currentExerciseIndex < workout.exercises.length - 1) {
        return true;
      } else {
        return false;
      }
    }
  };

  // recuperer l'exercise en cours selon l'index
  const getCurrentExercise = (): Exercise | null => {
    if (!workout) {
      return null;
    }

    // renvoie l'exercice en cours avec currentExerciseIndex
    return workout.exercises[currentExerciseIndex];
  };

  // fonction async pour pouvoir attendre la resolution d'une promesse
  const fetchWorkout = async () => {
    // on attend le resutat de la requete
    const result = await request("/workout/" + params.workoutId, "GET");

    // on range le workout dans notre state
    setWorkout(result);
  };

  const persistSetsData = async (setsData: SetData[]) => {
    const reps: Array<number> = [];
    const weights: Array<number> = [];

    setsData.forEach((setData) => {
      reps.push(setData.reps);
      weights.push(setData.weight);
    });

    const payload = {
      reps,
      weights,
      session_id: parseInt(params.sessionId!),
      exercise_id: getCurrentExercise()?.id,
    };

    try {
      await request("/session_exercise", "POST", payload);

      // si il reste des exos, on avance
      if (canGoToNextExercise()) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      }

      // on stocke le nom de l'exo que l'on a terminé
      setCompletedExercises([
        // je recopie les anciens exos terminés
        ...completedExercises,
        // TODO comprendre prq il faut le !
        getCurrentExercise()?.name!,
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  // appeller une fonction au premier rendu
  useEffect(() => {
    // premier chargement de la page, je vais faire ma requete GET
    fetchWorkout();
  }, []);

  return (
    <VStack paddingLeft={15} paddingRight={15} alignItems="center">
      <Heading mb={30} textAlign="center" mt={5} size="xl">
        {`Doing workout ${workout?.name}`}
      </Heading>
      {workout && getCurrentExercise() !== null ? (
        <CurrentExerciseInput
          exercise={getCurrentExercise() as Exercise}
          onExerciseCompleted={(setsData: SetData[]) => {
            persistSetsData(setsData);
          }}
          hasCompletedWorkout={
            // est ce que jai terminé autant d'exos qu'il y a dans notre workout
            completedExercises.length === workout.exercises.length
          }
        />
      ) : null}
      {completedExercises.length > 0 && (
        <VStack>
          <Heading
            textAlign="center"
            mt={10}
            mb={5}
            size="md"
          >{`Completed exercises :`}</Heading>
          {completedExercises.map((exercise) => (
            <HStack key={exercise} justifyContent="space-around" p={4}>
              <Heading size="sm" numberOfLines={2}>
                {exercise}
              </Heading>
            </HStack>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default OngoingSessionPage;
