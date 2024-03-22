import * as React from "react";
import { VStack, Text, Input, InputField, Heading } from "@gluestack-ui/themed";
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
          onExerciseCompleted={function (setsData: SetData[]): void {
            console.log(
              "lexo est terminé, voici la saisie utilisateur",
              setsData,
            );

            // TODO saisie POST sur session_exercise
          }}
        />
      ) : null}
    </VStack>
  );
};

export default OngoingSessionPage;
