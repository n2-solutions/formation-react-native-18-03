import { Exercise } from "./exercice";

export type Workout = {
  id: number;
  name: string;
  description: string;
};

export type WorkoutWithExercises = Workout & {
  exercises: Array<Exercise>;
};
