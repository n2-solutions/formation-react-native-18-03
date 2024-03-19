import * as React from "react";
import {
  Button,
  ButtonText,
  Input,
  InputField,
  Spinner,
  VStack,
  Text,
} from "@gluestack-ui/themed";
import CircleLogo from "../../components/logo/CircleLogo";
import { useState } from "react";
import useApi from "../../hooks/useApi";

const HomePage = () => {
  const { request, isLoading, errorMessage } = useApi();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [authToken, setAuthToken] = useState<string | null>(null);

  const handleClearFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setAuthToken(null);
  };

  const handleSignup = async () => {
    const payload = { name, email, password };

    const result = await request("/auth/signup", "POST", payload);

    console.log("result", result);
  };

  return (
    <VStack paddingLeft={15} paddingRight={15} alignItems="center">
      <CircleLogo width={200} height={200} />
      <Button marginTop={15} onTouchEnd={handleClearFields}>
        <ButtonText>Vider les champs</ButtonText>
      </Button>
      <Input
        isDisabled={!!authToken}
        marginTop={15}
        variant="outline"
        size="md"
      >
        <InputField placeholder="Name" value={name} onChangeText={setName} />
      </Input>
      <Input
        isDisabled={!!authToken}
        marginTop={15}
        variant="outline"
        size="md"
      >
        <InputField
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </Input>
      <Input
        isDisabled={!!authToken}
        marginTop={15}
        variant="outline"
        size="md"
      >
        <InputField
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </Input>
      {isLoading && <Spinner size="small" />}
      {errorMessage !== "" && <Text>{errorMessage}</Text>}
      {authToken && <Text>Ton token est : {authToken}</Text>}
      <Button marginTop={15} onTouchEnd={handleSignup}>
        <ButtonText>S'inscrire</ButtonText>
      </Button>
    </VStack>
  );
};

export default HomePage;
