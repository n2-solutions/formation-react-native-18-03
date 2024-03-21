import * as React from "react";
import { VStack, Text, Input, InputField, Heading } from "@gluestack-ui/themed";
import { useNavigate, useParams } from "react-router-native";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { WorkoutWithExercises } from "../../types/workout";

const OngoingSessionPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { request, isLoading, errorMessage } = useApi();
  const [workout, setWorkout] = useState<WorkoutWithExercises | null>(null);

  const fetchWorkout = async () => {
    const result = await request("/workout/" + params.workoutId, "GET");

    setWorkout(result);
  };

  useEffect(() => {
    // premier chargement de la page, je vais faire ma requete GET
    fetchWorkout();
  }, []);

  return (
    <VStack paddingLeft={15} paddingRight={15} alignItems="center">
      <Heading mb={30} textAlign="center" mt={5} size="xl">
        {`Doing workout ${workout?.name}`}
      </Heading>
    </VStack>
  );
};

export default OngoingSessionPage;
