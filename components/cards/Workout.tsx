import {
  Box,
  Button,
  ButtonGroup,
  ButtonText,
  Heading,
  Image,
  Pressable,
  VStack,
} from "@gluestack-ui/themed";
import { Workout } from "../../types/workout";
import { Dimensions } from "react-native";

type WorkoutCardProps = {
  workout: Workout;
  onEdit: (id: number) => void;
  onView: (id: number) => void;
  onStart: (id: number) => void;
  onViewStats: (id: number) => void;
};

function WorkoutCard(props: WorkoutCardProps) {
  return (
    <Pressable
      width="100%"
      mb={15}
      bg="$primary100"
      paddingBottom={10}
      borderRadius={10}
      onPress={() => props.onView(props.workout.id)}
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
        }}
        alt="Une image a la salle de sport"
        borderRadius={10}
        height={150}
        width={Dimensions.get("window").width}
      />
      <VStack px={10} justifyContent="space-between">
        <Heading mb={10}>{props.workout.name}</Heading>
        <ButtonGroup justifyContent="space-between" alignItems="center">
          <Button
            variant="solid"
            action="secondary"
            onPress={(e) => {
              props.onEdit(props.workout.id);
            }}
          >
            <ButtonText fontSize="$sm" fontWeight="$medium">
              Edit
            </ButtonText>
          </Button>
          <Button
            variant="solid"
            action="secondary"
            onPress={(e) => {
              props.onViewStats(props.workout.id);
            }}
          >
            <ButtonText fontSize="$sm" fontWeight="$medium">
              View stats
            </ButtonText>
          </Button>
          <Button
            variant="solid"
            action="primary"
            onPress={(e) => {
              props.onStart(props.workout.id);
            }}
          >
            <ButtonText fontSize="$sm" fontWeight="$medium">
              Start
            </ButtonText>
          </Button>
        </ButtonGroup>
      </VStack>
    </Pressable>
  );
}

export default WorkoutCard;
