import React from "react";
import EditWorkoutView from "../../../pages/EditWorkout/EditWorkoutView";
import { WorkoutWithExercises } from "../../../types/workout";

const defaultWorkout: WorkoutWithExercises = {
  id: 9,
  name: "Pull day",
  description: "Dos, biceps, trapèzes",
  exercises: [
    {
      id: 29,
      name: "Traction à la barre fixe",
      sets: 4,
      reps: 10,
      isCalisthenic: true,
    },
    {
      id: 30,
      name: "Soulevé de terre",
      sets: 4,
      reps: 10,
      isCalisthenic: false,
    },
    {
      id: 31,
      name: "Curl haltères",
      sets: 4,
      reps: 10,
      isCalisthenic: false,
    },
    {
      id: 32,
      name: "Shrugs haltères",
      sets: 4,
      reps: 10,
      isCalisthenic: false,
    },
  ],
};

export default {
  title: "pages/EditWorkout/EditWorkoutView",
  component: EditWorkoutView,
};

export const Default = () => (
  <EditWorkoutView
    workout={defaultWorkout}
    onUpdateExercise={() => {
      console.log("onUpdateExercise called");
    }}
    onDeleteExercise={() => {
      console.log("onDeleteExercise called");
    }}
    onAddExercise={() => {
      console.log("onAddExercise called");
    }}
    onSaveWorkout={() => {
      console.log("onSaveWorkout called");
    }}
  />
);
