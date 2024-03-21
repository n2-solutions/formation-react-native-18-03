import { useEffect, useState } from "react";

import {
  VStack,
  Text,
  Heading,
  Spinner,
  Box,
  ScrollView,
  Center,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { useAuth } from "../../context/Auth";
import useApi from "../../hooks/useApi";
import { Workout, WorkoutWithExercises } from "../../types/workout";
import WorkoutCard from "../../components/cards/Workout";
import ExerciseCard from "../../components/cards/Exercise";
import { useNavigate, useParams } from "react-router-native";

const WorkoutDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { request, isLoading, errorMessage } = useApi();
  const [workout, setWorkout] = useState<WorkoutWithExercises | null>(null);

  const fetchWorkout = async () => {
    const result = await request("/workout/" + params.workoutId, "GET");

    console.log(result);

    setWorkout(result);
  };

  useEffect(() => {
    // premier chargement de la page, je vais faire ma requete GET
    fetchWorkout();
  }, []);

  return (
    <VStack
      height="100%"
      paddingLeft={15}
      paddingRight={15}
      alignItems="center"
    >
      {workout ? (
        <>
          <Heading textAlign="center" mt={5} size="xl">
            {`Viewing ${workout.name}`}
          </Heading>
          <Text size="xl" mb={30}>
            {workout.description}
          </Text>
          <ScrollView height="80%" mt={5}>
            {workout.exercises.map((exercise) => (
              <ExerciseCard exercise={exercise} />
            ))}
          </ScrollView>
          <Button
            width="100%"
            variant="outline"
            onTouchEnd={() => navigate(`/workout/${params.workoutId}/edit`)}
          >
            <ButtonText>Edit this workout</ButtonText>
          </Button>
          <Button
            width="100%"
            my={15}
            onTouchEnd={() =>
              navigate(`/workout/${params.workoutId}/start-session`)
            }
          >
            <ButtonText>Start this workout</ButtonText>
          </Button>
        </>
      ) : (
        <Center width="100%" height="50%">
          <Spinner size="large" />
        </Center>
      )}
    </VStack>
  );
};

export default WorkoutDetailPage;
