import React from "react";
import { Exercise } from "../../types/exercice";
import {
  Box,
  HStack,
  Heading,
  Badge,
  BadgeText,
  Text,
  VStack,
} from "@gluestack-ui/themed";

type ExerciseCardProps = {
  exercise: Exercise;
};

const ExerciseCard = (props: ExerciseCardProps) => {
  return (
    <VStack bg="primary.50" borderRadius="$lg" marginBottom={5}>
      <HStack
        alignItems="flex-start"
        justifyContent="space-between"
        p={4}
        minWidth="100%"
      >
        <Heading size="sm" numberOfLines={2}>
          {props.exercise.name}
        </Heading>
        <Text fontSize="$sm">
          {props.exercise.sets}
          <Text fontWeight="bold"> sets </Text>
          {"of "}
          {`${props.exercise.reps} reps`}
        </Text>
      </HStack>
      <Box>
        <HStack justifyContent="flex-end">
          {props.exercise.isCalisthenic ? (
            <Badge variant="solid" action="info">
              <BadgeText>Calisthenic</BadgeText>
            </Badge>
          ) : (
            <Badge variant="solid" action="info">
              <BadgeText>With weights</BadgeText>
            </Badge>
          )}
        </HStack>
      </Box>
    </VStack>
  );
};

export default ExerciseCard;
