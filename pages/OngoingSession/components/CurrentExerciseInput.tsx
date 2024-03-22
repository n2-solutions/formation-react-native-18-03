import { Box, Button, ButtonText, HStack, Heading } from "@gluestack-ui/themed";
import SetDataInput from "../../../components/input/SetDataInput";
import {
  Exercise,
  SetData,
  createDefaultSetsDataFromExercise,
} from "../../../types/exercise";
import { useState } from "react";

export type CurrentExerciseInputProps = {
  exercise: Exercise;
  onExerciseCompleted: (setsData: Array<SetData>) => void;
};

function CurrentExerciseInput(props: CurrentExerciseInputProps) {
  // sur quelle serie on se trouve ?
  const [currentSetIndex, updateCurrentSetIndex] = useState<number>(0);

  // je prepare mes données de series pour mon exo
  const [setsData, updateSetsData] = useState<Array<SetData>>(
    // petite fonction qui me prepare mon tableau de setData
    // param de useState = valeur par defaut de mon state.
    createDefaultSetsDataFromExercise(props.exercise),
  );

  // prend en parametre un nouveau setData, et remplace dans le tableau
  const updateSetDataAtCurrentIndex = (newSetData: SetData) => {
    // je recopie mon tableau
    const updatedSetsData = [...setsData];

    // je change le setData qui correspond a la serie en cours
    // pour celui recu en parametre
    updatedSetsData[currentSetIndex] = newSetData;

    // Use updateSetsData to set the new state
    updateSetsData(updatedSetsData);
  };

  const handleSetDone = () => {
    // si jai fait toutes les series de mon exo
    // ?? est ce que je suis sur la dernier serie ?
    // je vais comparer  a quelle serie je suis (currentSetIndex) au nombre de series definies
    // dans lexo (props.exercise.sets)

    if (currentSetIndex <= props.exercise.sets - 1) {
      // jai pas fini, je change juste de set
      updateCurrentSetIndex(currentSetIndex + 1);
    } else {
      // jai fini, je passe a l'exo suivant !
      // jenvoie au composant parent les infos de ma serie
      props.onExerciseCompleted(setsData);
    }

    // =====> je passe a l'exo suivant
    // si il me reste des series a faire
    // =====> jaugmente juste mon currentSetIndex
  };

  return (
    <Box width="100%" bg="$primary50" borderRadius={10} padding={15}>
      <Heading
        textAlign="left"
        mb={5}
        size="sm"
        color="$info500"
      >{`Current exercise : ${props.exercise.name}`}</Heading>
      <SetDataInput
        setData={setsData[currentSetIndex]}
        // quand une serie est modifiée (je change le poids, ou le nombre de repetitions)
        updateSetData={updateSetDataAtCurrentIndex}
        maxReps={props.exercise.reps}
        isCalisthenic={false}
      />

      <HStack mt={10} justifyContent="space-between" alignItems="flex-end">
        <Box>
          <Heading
            textAlign="left"
            mt={5}
            mb={5}
            size="sm"
            color="$info500"
          >{`Set ${currentSetIndex + 1} of ${props.exercise.sets}`}</Heading>
        </Box>

        <Button size="sm" action="positive" mt={5} onPress={handleSetDone}>
          <ButtonText>Set done</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
}

export default CurrentExerciseInput;
