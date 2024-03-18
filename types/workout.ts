import { Exercise } from "./exercice";

export type Workout = {
  id: number;
  name: string;
};

export type WorkoutWithExercises = Workout & {
  exercises: Array<Exercise>;
};

export const createNewExercise = () => ({
  name: "New Exercise",
  sets: 4,
  reps: 10,
  isCalisthenic: false,
});
