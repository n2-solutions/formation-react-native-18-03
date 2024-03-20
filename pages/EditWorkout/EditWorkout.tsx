import * as React from "react";
import {
  VStack,
  Text,
  Input,
  InputField,
  Heading,
  Button,
  ButtonText,
  Box,
  ButtonSpinner,
  ScrollView,
} from "@gluestack-ui/themed";
import CircleLogo from "../../components/logo/CircleLogo";
import { useNavigate, useParams } from "react-router-native";
import { useAuth } from "../../context/Auth";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { WorkoutWithExercises } from "../../types/workout";
import { Exercise, createNewExercise } from "../../types/exercice";
import ExerciseCard from "../../components/cards/Exercise";
import ExerciseEditCard from "../../components/cards/ExerciseEdit";

// on veut editer un workout, cest a dire pouvoir ajouter, modifier, ou supprimer des exos

const EditWorkoutPage = () => {
  const params = useParams();
  const { request, isLoading, errorMessage } = useApi();
  const [workout, setWorkout] = useState<WorkoutWithExercises | null>(null);

  const fetchWorkout = async () => {
    const result = await request("/workout/" + params.id, "GET");

    setWorkout(result);
  };

  const deleteExerciseAtIndex = (index: number) => {
    // si on a pas de workout (l'api est encore en train de charger, ou a echoué, alors je return (je sors de la fonction))
    if (!workout) return;

    // je recopie mes exos
    const updatedExercises = [...workout.exercises];

    // je vais supprimer l'index en question
    // splice : supprime a l'index donné, N elements
    updatedExercises.splice(index, 1);

    setWorkout({
      ...workout,
      exercises: updatedExercises,
    });
  };

  const updateExerciseAtIndex = (index: number, updatedExercise: Exercise) => {
    if (!workout) return;

    // on recopie les exos
    const updatedExercises = [...workout.exercises];

    // on modifie juste l'exo qui a changé
    updatedExercises[index] = updatedExercise;

    // on sauvegarde le tout
    setWorkout({
      ...workout,
      exercises: updatedExercises,
    });
  };

  const appendEmptyExercise = () => {
    // si on a pas de workout (l'api est encore en train de charger, ou a echoué, alors je return (je sors de la fonction))
    if (!workout) return;

    // japelle setWorkout pour modifier mon state
    setWorkout({
      // on recopie toutes les infos de workout
      ...workout,
      exercises: [
        // on recopie tous les anciens exos
        ...workout.exercises,
        // et on ajoute un nouvel exercice a la fin
        createNewExercise(),
      ],
    });
  };

  const handleSaveWorkout = async () => {
    // TODO appeller l'endpoint /workout/{workout_id} en PATCH
    // - on peut reutiliser bien sur le hook useApi (on peut appeler request plusieurs fois)
    // - attention a pas oublier le verbe PATCH
    // - bien sur, si ca fonctionne, rediriger vers la liste des workouts
  };

  useEffect(() => {
    // premier chargement de la page, je vais faire ma requete GET
    fetchWorkout();
  }, []);

  return (
    <VStack paddingLeft={15} paddingRight={15} alignItems="center">
      <Text>{JSON.stringify(workout)}</Text>
      <Heading mb={30} textAlign="center" mt={40} size="lg">
        {`Editing workout ${workout?.name}`}
      </Heading>
      <ScrollView>
        {workout?.exercises.map((exercise, index) => (
          <ExerciseEditCard
            exercise={exercise as Exercise}
            onEdit={(exercise) => {
              updateExerciseAtIndex(index, exercise);
            }}
            onDelete={() => {
              deleteExerciseAtIndex(index);
            }}
          />
        ))}
      </ScrollView>
      <Button width="100%" variant="outline" onTouchEnd={appendEmptyExercise}>
        <ButtonText>Add an exercise</ButtonText>
      </Button>
      <Button width="100%" marginTop={10} onPress={handleSaveWorkout}>
        <ButtonText>Save this workout</ButtonText>
      </Button>
    </VStack>
  );
};

export default EditWorkoutPage;
