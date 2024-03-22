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
                // objectif : fabriquer un tableau avec nos data sur lesquelles ont veut un graphique
                // cad un tableau de number ( soit des series, soit un poids max)
                datasets: [
                  {
                    data: e.sessions.map((session) => {
                      // premiere grande question, est-ce que je suis sur un exo en PDC ou pas (isCalisthenic)
                      if (e.isCalisthenic) {
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
