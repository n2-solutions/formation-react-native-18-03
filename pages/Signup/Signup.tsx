import * as React from "react";
import {
  Button,
  ButtonText,
  Input,
  InputField,
  Spinner,
  VStack,
  Text,
  Link,
  LinkText,
} from "@gluestack-ui/themed";
import CircleLogo from "../../components/logo/CircleLogo";
import { useState } from "react";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-native";

const SignupPage = () => {
  const { request, isLoading, errorMessage } = useApi();
  const navigate = useNavigate();

  const [name, setName] = useState("Nono Gambini");
  const [email, setEmail] = useState("nono@n2.solutions");
  const [password, setPassword] = useState("12345678A#");

  const handleSignup = async () => {
    const payload = { name, email, password };

    // je fais ma requete avec mon hook custom
    try {
      const result = await request("/auth/signup", "POST", payload);

      navigate("/workouts");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <VStack paddingLeft={15} paddingRight={15} alignItems="center">
      <CircleLogo marginTop={15} width={200} height={200} />
      <Input marginTop={35} variant="outline" size="md">
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
      <Button onTouchEnd={handleSignup}>
        <ButtonText>Signup</ButtonText>
      </Button>
      <Link mt={36} onPress={() => navigate("/login")}>
        <LinkText>I wish to login instead</LinkText>
      </Link>
    </VStack>
  );
};

export default SignupPage;
