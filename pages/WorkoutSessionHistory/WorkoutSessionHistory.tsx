import * as React from "react";
import { Box, Heading, ScrollView, VStack } from "@gluestack-ui/themed";
import CircleLogo from "../../components/logo/CircleLogo";

import { LineChart } from "react-native-chart-kit";
import { format } from "date-fns";
import { Dimensions } from "react-native";

// données de test
import workout from "./testData";

// si exo calisthenic on regarde la progression du nombre moyen de répétitions par série
// si exo normal on regarde la progression du poids maximal soulevé par session

const WorkoutSessionHistory = () => {
  return (
    <ScrollView>
      {workout.exercises.map((e) => {
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
            <LineChart
              data={{
                labels: e.sessions.map((s) =>
                  format(new Date(s.created_at), "dd/MM"),
                ),
                datasets: [
                  {
                    // TODO : fabriquer le tableau de data [] pour faire de zoli graphiques, en se basant
                    // sur les infos de workout_with_sessions (testData a coté de cette page)
                    // Pour rappel :
                    //  si calisthenic je veux le nombre moyen de répétitions par série
                    // si exo normal je veux le poids maximal soulevé par session
                    // bien entendu, une case de data = 1 session
                    // dans notre fichier de test, on a 3 sessions
                    //
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width * 0.9} // from react-native
              height={220}
              yAxisSuffix={e.isCalisthenic ? "" : "kg"}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </Box>
        );
      })}
    </ScrollView>
  );
};

export default WorkoutSessionHistory;
