import { useEffect, useState } from "react";

import {
  VStack,
  Text,
  Heading,
  Spinner,
  Box,
  ScrollView,
} from "@gluestack-ui/themed";
import { useAuth } from "../../context/Auth";
import useApi from "../../hooks/useApi";
import { Workout } from "../../types/workout";
import WorkoutCard from "../../components/cards/Workout";
import { useNavigate, useParams } from "react-router-native";

const WorkoutDetailPage = () => {
  const params = useParams();

  const { request, isLoading, errorMessage } = useApi();
  const [workout, setWorkout] = useState<Workout | null>(null);

  const fetchWorkout = async () => {
    const result = await request("/workout/" + params.id, "GET");

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
      <Heading mb={30} textAlign="center" mt={5} size="xl">
        Workout detail : {params.id}
      </Heading>
      {/* TODO utiliser le state workout */}
    </VStack>
  );
};

export default WorkoutDetailPage;
