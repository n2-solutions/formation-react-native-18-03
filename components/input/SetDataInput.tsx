import {
  ArrowDownIcon,
  ArrowUpIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import * as React from "react";
import { SetData } from "../../types/exercise";
import { closestMultipleOfFive } from "../../utils/utils";

export type SetDataInputProps = {
  setData: SetData;
  updateSetData: (setData: SetData) => void;
  maxReps: number;
  isCalisthenic: boolean;
};

export default function SetDataInput(props: SetDataInputProps) {
  return (
    <Box width="100%" bg="$primary50" borderRadius={10} px={15}>
      {/* WEIGHT */}
      <HStack my={15} justifyContent="space-evenly" alignItems="center">
        <Button
          variant="link"
          action="primary"
          size="xs"
          isDisabled={props.isCalisthenic}
          onTouchEnd={() => {
            if (props.setData.weight - 1 >= 0) {
              props.updateSetData({
                ...props.setData,
                weight: props.setData.weight - 1,
              });
            }
          }}
        >
          <VStack alignContent="center" alignItems="center">
            <ButtonIcon as={ChevronLeftIcon} />
            <ButtonText>- 1kg</ButtonText>
          </VStack>
        </Button>
        <Button
          variant="link"
          action="primary"
          size="sm"
          isDisabled={props.isCalisthenic}
          onTouchEnd={() =>
            props.updateSetData({
              ...props.setData,
              weight: closestMultipleOfFive(props.setData.weight, "down"),
            })
          }
        >
          <VStack alignContent="center" alignItems="center">
            <ButtonIcon as={ChevronsLeftIcon} />
            <ButtonText>- 5kg</ButtonText>
          </VStack>
        </Button>
        {/* If we are doing a calisthenic exercise, there is no point in displaying a weight */}
        <Text size="3xl" color={props.isCalisthenic ? "$light300" : void 0}>
          {!props.isCalisthenic ? `${props.setData.weight}kg` : "N/A"}
        </Text>
        <Button
          variant="link"
          action="primary"
          size="sm"
          isDisabled={props.isCalisthenic}
          onTouchEnd={() =>
            props.updateSetData({
              ...props.setData,
              weight: closestMultipleOfFive(props.setData.weight, "up"),
            })
          }
        >
          <VStack alignContent="center" alignItems="center">
            <ButtonIcon as={ChevronsRightIcon} />
            <ButtonText>+ 5kg</ButtonText>
          </VStack>
        </Button>
        <Button
          variant="link"
          action="primary"
          size="xs"
          isDisabled={props.isCalisthenic}
          // TODO round to closest 5
          onTouchEnd={() =>
            props.updateSetData({
              ...props.setData,
              weight: props.setData.weight + 1,
            })
          }
        >
          <VStack alignContent="center" alignItems="center">
            <ButtonIcon as={ChevronRightIcon} />
            <ButtonText>+ 1kg</ButtonText>
          </VStack>
        </Button>
      </HStack>
      {/* REPS */}
      <VStack mt={10} alignItems="center">
        <Slider
          defaultValue={10}
          size="md"
          orientation="horizontal"
          value={props.setData.reps}
          onChange={(reps) =>
            props.updateSetData({
              ...props.setData,
              reps,
            })
          }
          minValue={0}
          maxValue={props.maxReps}
          accessibilityLabel="Reps"
          step={1}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text size="xl" my={10}>
          {props.setData.reps} reps
        </Text>
      </VStack>
    </Box>
  );
}
