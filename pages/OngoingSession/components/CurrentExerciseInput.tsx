import { Box, Button, ButtonText } from "@gluestack-ui/themed";
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
    <Box>
      <SetDataInput
        setData={setsData[currentSetIndex]}
        // quand une serie est modifiée (je change le poids, ou le nombre de repetitions)
        updateSetData={updateSetDataAtCurrentIndex}
        maxReps={0}
        isCalisthenic={false}
      />

      {/* lorsque jai fini une serie de mon exo, jappelle handleSetDone */}
      <Button size="sm" action="positive" mt={5} onTouchEnd={handleSetDone}>
        <ButtonText>Set done</ButtonText>
      </Button>
    </Box>
  );
}

export default CurrentExerciseInput;
