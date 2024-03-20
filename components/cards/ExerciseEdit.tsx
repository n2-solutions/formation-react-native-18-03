import React, { useRef, useEffect } from "react";

import { Exercise } from "../../types/exercice";
import {
  Box,
  HStack,
  Input,
  Slider,
  Checkbox,
  Button,
  Text,
  InputField,
  ButtonText,
  VStack,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
  CheckboxLabel,
  ButtonIcon,
  EditIcon,
  TrashIcon,
} from "@gluestack-ui/themed";

type ExerciseEditCardProps = {
  exercise: Exercise;
  onEdit: (exercise: Exercise) => void;
  onDelete: () => void;
};

function ExerciseEditCard(props: ExerciseEditCardProps) {
  const inputRef = useRef(null);
  const [isEditingName, setIsEditingName] = React.useState(false);
  const toggleEditing = () => setIsEditingName(!isEditingName);

  const handleEditName = () => {
    if (!isEditingName) {
      setIsEditingName(true);
    } else {
      setIsEditingName(false);
    }
  };

  // a chaque fois que isEditingName change, je passe dans mon effet
  useEffect(() => {
    if (isEditingName && !!inputRef?.current) {
      // je focus le champ
      (inputRef.current as any).focus();
    }
  }, [isEditingName]);

  return (
    <Box
      bg="$primary50"
      padding={10}
      borderRadius="$lg"
      marginBottom={10}
      minWidth="100%"
    >
      <VStack>
        {isEditingName ? (
          <HStack justifyContent="space-between" alignItems="center">
            <Input width="70%" size="lg">
              <InputField
                // a chaque nouveau rendu, une reference vers l'input est stockée dans inputRef
                ref={inputRef}
                placeholder="name"
                value={props.exercise.name}
                selectTextOnFocus
                onChangeText={(name: string) =>
                  props.onEdit({
                    ...props.exercise,
                    name,
                  })
                }
              />
            </Input>
            <Button
              variant="solid"
              action="positive"
              size="sm"
              onTouchEnd={toggleEditing}
            >
              <ButtonText>Save</ButtonText>
            </Button>
          </HStack>
        ) : (
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$lg" bold>
              {props.exercise.name}
            </Text>
            <HStack>
              <Button
                variant="solid"
                action="positive"
                size="sm"
                mx={10}
                onTouchEnd={handleEditName}
                accessibilityHint="Edit"
              >
                <ButtonIcon as={EditIcon} />
              </Button>
              <Button
                variant="solid"
                action="negative"
                size="sm"
                onTouchEnd={props.onDelete}
              >
                <ButtonIcon as={TrashIcon} />
              </Button>
            </HStack>
          </HStack>
        )}
        {/* sets */}
        <HStack mt={10} justifyContent="space-between">
          <Slider
            width="70%"
            value={props.exercise.sets}
            onChange={(sets) =>
              props.onEdit({
                ...props.exercise,
                sets,
              })
            }
            minValue={0}
            maxValue={20}
            accessibilityLabel="Steps"
            step={1}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Text fontSize="$md">{props.exercise.sets} sets</Text>
        </HStack>

        {/* reps */}
        <HStack mt={10} justifyContent="space-between">
          <Slider
            width="70%"
            value={props.exercise.reps}
            onChange={(reps) => {
              props.onEdit({
                ...props.exercise,
                reps,
              });
            }}
            minValue={0}
            maxValue={50}
            accessibilityLabel="Reps"
            step={1}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Text fontSize="$md">{props.exercise.reps + " reps"}</Text>
        </HStack>

        <HStack>
          <Checkbox
            size="md"
            mt={10}
            aria-label="is Calisthenic"
            aria-checked={props.exercise.isCalisthenic}
            isInvalid={false}
            isDisabled={false}
            value="isCalisthenic"
            isChecked={props.exercise.isCalisthenic}
            onChange={(checked) =>
              props.onEdit({
                ...props.exercise,
                isCalisthenic: checked,
              })
            }
          >
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>is a calisthenic exercise</CheckboxLabel>
          </Checkbox>
        </HStack>
      </VStack>
    </Box>
  );
}

export default ExerciseEditCard;
