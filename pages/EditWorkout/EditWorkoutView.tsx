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
  ScrollView,
} from "@gluestack-ui/themed";
import CircleLogo from "../../components/logo/CircleLogo";
import { useNavigate, useParams } from "react-router-native";
import { useAuth } from "../../context/Auth";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { WorkoutWithExercises } from "../../types/workout";
import { Exercise, createNewExercise } from "../../types/exercise";
import ExerciseCard from "../../components/cards/Exercise";
import ExerciseEditCard from "../../components/cards/ExerciseEdit";

type EditWorkoutViewProps = {
  workout: WorkoutWithExercises | null;
  onUpdateExercise: (index: number, exercise: Exercise) => void;
  onDeleteExercise: (index: number) => void;
  onAddExercise: () => void;
  onSaveWorkout: () => void;
};

// on veut editer un workout, cest a dire pouvoir ajouter, modifier, ou supprimer des exos
const EditWorkoutView = ({
  workout,
  onUpdateExercise,
  onDeleteExercise,
  onAddExercise,
  onSaveWorkout,
}: EditWorkoutViewProps) => {
  return (
    <VStack paddingLeft={15} paddingRight={15} alignItems="center">
      <Heading mb={30} textAlign="center" mt={40} size="lg">
        {`Editing workout ${workout?.name}`}
      </Heading>
      <ScrollView>
        {workout?.exercises.map((exercise, index) => (
          <ExerciseEditCard
            exercise={exercise as Exercise}
            onEdit={(exercise) => {
              onUpdateExercise(index, exercise);
            }}
            onDelete={() => {
              onDeleteExercise(index);
            }}
          />
        ))}
      </ScrollView>
      <Button width="100%" variant="outline" onTouchEnd={onAddExercise}>
        <ButtonText>Add an exercise</ButtonText>
      </Button>
      <Button width="100%" marginTop={10} onPress={onSaveWorkout}>
        <ButtonText>Save this workout</ButtonText>
      </Button>
    </VStack>
  );
};

export default EditWorkoutView;
