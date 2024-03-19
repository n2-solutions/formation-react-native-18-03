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
import { useContext, useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { AuthContext, useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-native";

const SignupPage = () => {
  const { request, isLoading, errorMessage } = useApi();
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

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

    // je fais ma requete avec mon hook custom
    try {
      const result = await request("/auth/signup", "POST", payload);
      // si reussite, je stocke mon token dans mon contexte
      setToken(result.authToken);

      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
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
      {isLoading && <Spinner size="small" />}
      {errorMessage !== "" && <Text>{errorMessage}</Text>}
      <Button marginTop={15} onTouchEnd={handleSignup}>
        <ButtonText>S'inscrire</ButtonText>
      </Button>
    </VStack>
  );
};

export default SignupPage;
