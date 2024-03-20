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

type ExerciseEditCardProps = {
  exercise: Exercise;
  onEdit: (exercise: Exercise) => void;
  onDelete: () => void;
};

// TODO : en utilisant la doc de glustack ui : https://gluestack.io
// - avoir un bouton pour supprimer l'exercise, qui appelle onDelete
// - brancher le nombre de series (sets) et de repetitions (reps) sur des composants GlueStack
// https://gluestack.io/ui/docs/components/forms/slider
// - pour le isCalisthenic, https://gluestack.io/ui/docs/components/forms/checkbox
// - lorsque on modifie ces donnees, appeler onEdit dans les callbacks des composants de saisie (slider, checkbox...)
// - bonus : pouvoir editer le nom
const ExerciseEditCard = (props: ExerciseEditCardProps) => {
  return (
    <VStack bg="primary.50" borderRadius="$lg" marginBottom={5}>
      <Heading size="sm" numberOfLines={2}>
        {props.exercise.name}
      </Heading>
    </VStack>
  );
};

export default ExerciseEditCard;
