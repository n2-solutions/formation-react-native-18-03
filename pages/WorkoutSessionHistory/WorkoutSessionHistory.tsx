import * as React from "react";
import { Box, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import CircleLogo from "../../components/logo/CircleLogo";

import { LineChart } from "react-native-chart-kit";
import { format } from "date-fns";
import { Dimensions } from "react-native";

import { ExerciseWithSessions } from "../../types/exercise";
import { useParams } from "react-router-native";
import useApi from "../../hooks/useApi";
import { WorkoutWithExercisesAndSessions } from "../../types/workout";
import { useEffect, useState } from "react";

// si exo calisthenic on regarde la progression du nombre moyen de répétitions par série
// si exo normal on regarde la progression du poids maximal soulevé par session
const buildLineGraphOptionsFromExercise = (exercise: ExerciseWithSessions) => {
  return {
    data: {
      labels: exercise.sessions.map((s) =>
        format(new Date(s.created_at), "dd/MM"),
      ),
      // objectif : fabriquer un tableau avec nos data sur lesquelles ont veut un graphique
      // cad un tableau de number ( soit des series, soit un poids max)
      datasets: [
        {
          data: exercise.sessions.map((session) => {
            // premiere grande question, est-ce que je suis sur un exo en PDC ou pas (isCalisthenic)
            if (exercise.isCalisthenic) {
              // initalisation de la somme des repetitions
              let totalReps = 0;
              // on remplit avec foreach
              session.reps.forEach((rep) => {
                totalReps += rep;
              });

              const avg = totalReps / session.reps.length;
              return avg;
            } else {
              // on veut le poids maximal soulevé dans la session
              return Math.max(...session.weights);
            }
          }),
        },
      ],
    },
    width: Dimensions.get("window").width * 0.9, // from react-native
    height: 220,
    yAxisSuffix: exercise.isCalisthenic ? "" : "kg",
    yAxisInterval: 1, // optional, defaults to 1
    chartConfig: {
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    },
    bezier: true,
    style: {
      marginVertical: 8,
      borderRadius: 16,
    },
  };
};

const WorkoutSessionHistory = () => {
  const params = useParams();

  const { request, isLoading, errorMessage } = useApi();
  const [workout, setWorkout] =
    useState<WorkoutWithExercisesAndSessions | null>(null);

  const fetchWorkoutWithExercisesAndSessions = async () => {
    const result = await request(
      "/workout_with_sessions/" + params.workoutId,
      "GET",
    );

    console.log(result);

    setWorkout(result);
  };

  useEffect(() => {
    // premier chargement de la page, je vais faire ma requete GET
    fetchWorkoutWithExercisesAndSessions();
  }, []);

  return (
    <ScrollView>
      {workout?.exercises.map((e) => {
        // if no sessions for exercise, do nothing
        if (e.sessions.length === 0) {
          return null;
        }

        return (
          <Box key={e.id} width="100%" alignItems="center">
            <Heading size="sm" ml={5} numberOfLines={2}>
              {`${e.name}`}
            </Heading>
            <Heading size="xs" ml={5} mt={5}>
              {e.isCalisthenic
                ? "Showing average reps per set"
                : "Showing max weight per session"}
            </Heading>
            <LineChart {...buildLineGraphOptionsFromExercise(e)} />
          </Box>
        );
      })}
    </ScrollView>
  );
};

export default WorkoutSessionHistory;
