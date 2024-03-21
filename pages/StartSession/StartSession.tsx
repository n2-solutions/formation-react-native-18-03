import * as React from "react";
import {
  VStack,
  Text,
  Input,
  InputField,
  Heading,
  Button,
  ButtonText,
  Box,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import CircleLogo from "../../components/logo/CircleLogo";
import { useNavigate, useParams } from "react-router-native";
import { useAuth } from "../../context/Auth";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { WorkoutWithExercises } from "../../types/workout";

const StartSessionPage = () => {
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

  const createNewSession = async () => {
    try {
      const response = await request("/session", "POST", {
        workout_id: workout?.id,
      });

      // la session est créée, on navigue vers la page de session en cours
      navigate(`/workout/${workout?.id}/session/${response.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <VStack paddingLeft={15} paddingRight={15} alignItems="center">
      <Heading mb={30} textAlign="center" mt={5} size="xl">
        {`About to start workout ${workout?.name}`}
      </Heading>

      <Button
        isDisabled={isLoading}
        width="100%"
        marginTop={35}
        onPress={createNewSession}
      >
        <ButtonText>Start new session</ButtonText>
      </Button>
    </VStack>
  );
};

export default StartSessionPage;
