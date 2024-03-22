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
  // est-ce que on a au moins une serie restante
  const hasRemainingSet = currentSetIndex < props.exercise.sets - 1;

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

  const copyWeightToNextSet = () => {
    // je recupere le poids de la serie en cours
    const currentWeight = setsData[currentSetIndex].weight;

    // je recopie mon tableau
    const updatedSetsData = [...setsData];

    updatedSetsData[currentSetIndex + 1].weight = currentWeight;

    updateSetsData(updatedSetsData);
  };

  const handleSetDone = () => {
    if (hasRemainingSet) {
      // jai pas fini, je change juste de set mais je reste dans le meme exo
      updateCurrentSetIndex(currentSetIndex + 1);

      // si il reste au moins une serie sur mon exo, je pre-remplis le poids de cette serie, avec le poids du set en cours
      copyWeightToNextSet();
    } else {
      // jai fini, je passe a l'exo suivant !
      // jenvoie au composant parent les infos de ma serie
      props.onExerciseCompleted(setsData);
    }
  };

  return (
    <Box width="100%" bg="$primary50" borderRadius={10} padding={15}>
      {/* Titre de mon exo */}
      <Heading
        textAlign="left"
        mb={5}
        size="sm"
        color="$info500"
      >{`Current exercise : ${props.exercise.name}`}</Heading>
      {/* Un composant pour saisir les données de ma série (set = série) */}
      <SetDataInput
        setData={setsData[currentSetIndex]}
        // quand une serie est modifiée (je change le poids, ou le nombre de repetitions)
        updateSetData={updateSetDataAtCurrentIndex}
        maxReps={props.exercise.reps}
        isCalisthenic={props.exercise.isCalisthenic}
      />

      <HStack mt={10} justifyContent="space-between" alignItems="flex-end">
        <Box>
          {/* un petit affichage de ma série e cours */}
          <Heading
            textAlign="left"
            mt={5}
            mb={5}
            size="sm"
            color="$info500"
          >{`Set ${currentSetIndex + 1} of ${props.exercise.sets}`}</Heading>
        </Box>

        {/* un bouton pour dire que jai fini ma série */}
        <Button size="sm" action="positive" mt={5} onPress={handleSetDone}>
          <ButtonText>Set done</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
}

export default CurrentExerciseInput;
