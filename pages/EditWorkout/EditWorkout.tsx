import * as React from "react";
import { useNavigate, useParams } from "react-router-native";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { WorkoutWithExercises } from "../../types/workout";
import { Exercise, createNewExercise } from "../../types/exercise";
import EditWorkoutView from "./EditWorkoutView";

// on veut editer un workout, cest a dire pouvoir ajouter, modifier, ou supprimer des exos
const EditWorkoutPage = () => {
  const navigate = useNavigate();
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
    if (!workout) return;

    try {
      const response = await request(`/workout/${params.id}`, "PATCH", workout);

      // navigate to workout list upon success
      navigate("/workouts");
    } catch (error) {
      console.error("Save workout failed", error);
    }
  };

  useEffect(() => {
    // premier chargement de la page, je vais faire ma requete GET
    fetchWorkout();
  }, []);

  return (
    <EditWorkoutView
      workout={workout}
      onUpdateExercise={updateExerciseAtIndex}
      onDeleteExercise={deleteExerciseAtIndex}
      onAddExercise={appendEmptyExercise}
      onSaveWorkout={handleSaveWorkout}
    />
  );
};

export default EditWorkoutPage;
