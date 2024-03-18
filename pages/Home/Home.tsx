import * as React from "react";
import { StyleSheet } from "react-native";
import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Input,
  InputField,
  VStack,
} from "@gluestack-ui/themed";
import CircleLogo from "../../components/logo/CircleLogo";
import { useState } from "react";

const HomePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClearFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSignup = async () => {
    const payload = { name, email, password };
    const headers: any = { "Content-Type": "application/json" };

    try {
      // je fais l'appel avec fetch
      const response = await fetch(
        process.env.EXPO_PUBLIC_XANO_API_URL + "/auth/signup",
        {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        },
      );
      // je decode le body en JSON
      const result = await response.json();

      // Si on ne recoit pas un code de type 2xx
      if (!response.ok) {
        console.log("Erreur serveur :", result.message);
      } else {
        console.log("Reussite ", result);
      }
    } catch (error) {
      console.log("Error generale !", error);
    }
  };

  return (
    <VStack paddingLeft={15} paddingRight={15} alignItems="center">
      <CircleLogo width={200} height={200} />
      <Button marginTop={15} onTouchEnd={handleClearFields}>
        <ButtonText>Vider les champs</ButtonText>
      </Button>
      <Input marginTop={15} variant="outline" size="md">
        <InputField placeholder="Name" value={name} onChangeText={setName} />
      </Input>
      <Input marginTop={15} variant="outline" size="md">
        <InputField
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </Input>
      <Input marginTop={15} variant="outline" size="md">
        <InputField
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </Input>
      <Button marginTop={15} onTouchEnd={handleSignup}>
        <ButtonText>S'inscrire</ButtonText>
      </Button>
    </VStack>
  );
};

export default HomePage;
