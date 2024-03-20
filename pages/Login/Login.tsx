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

const LoginPage = () => {
  const { request, isLoading, errorMessage } = useApi();
  const navigate = useNavigate();

  const [email, setEmail] = useState("nono@n2.solutions");
  const [password, setPassword] = useState("12345678A#");

  const handleSignup = async () => {
    const payload = { email, password };

    // je fais ma requete avec mon hook custom
    try {
      const result = await request("/auth/login", "POST", payload);

      navigate("/workouts", {
        replace: true,
      });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <VStack paddingLeft={15} paddingRight={15} alignItems="center">
      <CircleLogo marginTop={15} width={200} height={200} />
      <Input marginTop={35} variant="outline" size="md">
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
        <ButtonText>Login</ButtonText>
      </Button>
      <Link mt={36} onPress={() => navigate("/signup")}>
        <LinkText>I wish to signup instead</LinkText>
      </Link>
    </VStack>
  );
};

export default LoginPage;
