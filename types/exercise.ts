export type ExerciseSession = {
  id: number;
  reps: number[];
  weights: number[];
  session_id: number;
  exercise_id: number;
  created_at: number;
};

export type Exercise = {
  id?: number;
  name: string;
  sets: number;
  reps: number;
  isCalisthenic: boolean;
};

export type ExerciseWithSessions = Exercise & {
  sessions: ExerciseSession[];
};

export type SetData = {
  reps: number;
  weight: number;
};

export const defaultExercise: Exercise = {
  name: "",
  sets: 4,
  reps: 10,
  isCalisthenic: false,
};

export const defaultSetData: SetData = {
  reps: 0,
  weight: 0,
};

export const createNewExercise = (): Exercise => ({
  name: "New Exercise",
  sets: 4,
  reps: 10,
  isCalisthenic: false,
});

export function createDefaultSetsDataFromExercise(
  exercise: Exercise,
): Array<SetData> {
  const defaultSetsData: Array<SetData> = [];

  for (let i = 0; i < exercise.sets; i++) {
    defaultSetsData.push({
      reps: exercise.reps,
      weight: 0,
    });
  }

  return defaultSetsData;
}
