import { Exercise, ExerciseWithSessions } from "./exercise";

export type Workout = {
  id: number;
  name: string;
  description: string;
};

export type WorkoutWithExercises = Workout & {
  exercises: Array<Exercise>;
};

export type WorkoutWithExercisesAndSessions = Workout & {
  exercises: Array<ExerciseWithSessions>;
};
