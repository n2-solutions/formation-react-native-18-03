import { Box, Button, ButtonText, HStack, Heading } from "@gluestack-ui/themed";
import SetDataInput from "../../../components/input/SetDataInput";
import {
  Exercise,
  SetData,
  createDefaultSetsDataFromExercise,
  defaultExercise,
} from "../../../types/exercise";
import { useEffect, useState } from "react";

function NextExerciseInput() {
  const [setsData] = useState<Array<SetData>>(
    createDefaultSetsDataFromExercise(defaultExercise),
  );

  return (
    <Box width="100%" bg="$primary50" borderRadius={10} padding={15}>
      {/* Titre de mon exo */}
      <Heading
        textAlign="left"
        mb={5}
        size="sm"
        color="$info500"
      >{`Current exercise : `}</Heading>
      {/* Un composant pour saisir les données de ma série (set = série) */}
      <SetDataInput
        setData={setsData[0]}
        // quand une serie est modifiée (je change le poids, ou le nombre de repetitions)
        updateSetData={() => 0}
        maxReps={10}
        isCalisthenic={false}
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
          >{`Set 1 of 4`}</Heading>
        </Box>

        {/* un bouton pour dire que jai fini ma série */}
        <Button size="sm" action="positive" mt={5}>
          <ButtonText>Set Done</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
}

export default NextExerciseInput;
