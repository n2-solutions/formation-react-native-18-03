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
} from "@gluestack-ui/themed";
import CircleLogo from "../../components/logo/CircleLogo";
import { useNavigate } from "react-router-native";
import { useAuth } from "../../context/Auth";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";

// objectif : pouvoir creer un workout
// faire un post sur /workout avec nom et description

const CreateWorkoutPage = () => {
  const navigate = useNavigate();
  const { request, isLoading, errorMessage } = useApi();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const saveWorkout = async () => {
    const payload = { name, description };

    try {
      await request("/workout", "POST", payload);

      navigate("/workouts");
    } catch (e) {
      console.log("Unknown error when creating workout");
    }
  };

  return (
    <VStack paddingLeft={15} paddingRight={15} alignItems="center">
      <Heading mb={30} textAlign="center" mt={5} size="xl">
        Create a workout
      </Heading>
      <Box width="100%">
        <Input marginBottom={20} variant="outline" size="md">
          <InputField placeholder="Name" value={name} onChangeText={setName} />
        </Input>
        <Input variant="outline" size="md">
          <InputField
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
        </Input>
      </Box>

      <Button
        isDisabled={isLoading || name === ""}
        width="100%"
        marginTop={35}
        onPress={saveWorkout}
      >
        {isLoading && <ButtonSpinner mr="$1" />}
        <ButtonText>
          {isLoading ? "Creation in progress" : "Create this workout"}
        </ButtonText>
      </Button>
    </VStack>
  );
};

export default CreateWorkoutPage;
