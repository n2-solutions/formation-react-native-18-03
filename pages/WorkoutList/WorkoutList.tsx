import { useEffect, useState } from "react";

import {
  VStack,
  Heading,
  Spinner,
  Button,
  ButtonText,
  ScrollView,
} from "@gluestack-ui/themed";
import { useAuth } from "../../context/Auth";
import useApi from "../../hooks/useApi";
import { Workout } from "../../types/workout";
import WorkoutCard from "../../components/cards/Workout";
import { useNavigate } from "react-router-native";

const WorkoutPage = () => {
  const navigate = useNavigate();
  const { request, isLoading, errorMessage } = useApi();
  const [workouts, setWorkouts] = useState<Array<Workout>>([]);

  const fetchWorkouts = async () => {
    const result = await request("/workout", "GET");

    setWorkouts(result);
  };

  useEffect(() => {
    // premier chargement de la page, je vais faire ma requete GET
    fetchWorkouts();
  }, []);

  return (
    <VStack
      height="100%"
      paddingLeft={15}
      paddingRight={15}
      alignItems="center"
    >
      <Heading mb={30} textAlign="center" mt={5} size="xl">
        My workouts
      </Heading>
      {isLoading ? (
        <Spinner size="large" />
      ) : (
        <ScrollView width="100%">
          {/* TODO : faire une jolie carte (dans un autre composant) qui affiche name, description, si possible une image
          illustrative. dans la carte 3 boutons : Editer le workout/Faire le workout/Voir l'historique du workout */}
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onEdit={function (id: number): void {
                navigate(`/workout/${id}/edit`);
              }}
              onView={function (id: number): void {
                navigate(`/workout/${id}`);
              }}
              onStart={function (id: number): void {
                navigate(`/workout/${id}/start-session`);
              }}
              onViewStats={function (id: number): void {
                navigate(`/workout/${id}/view-stats`);
              }}
            />
          ))}
        </ScrollView>
      )}
      <Button
        width="100%"
        my={15}
        onTouchEnd={() => {
          navigate(`/workout/new`);
        }}
      >
        <ButtonText>Create a workout</ButtonText>
      </Button>
    </VStack>
  );
};

export default WorkoutPage;
