import * as React from "react";
import { VStack, Text } from "@gluestack-ui/themed";
import CircleLogo from "../../components/logo/CircleLogo";
import { useNavigate } from "react-router-native";
import { useAuth } from "../../context/Auth";
import { useEffect } from "react";

// comment faire pour que, si jarrive sur la page d'acceil, et que je ne suis pas
// connecté, je sois redirigé sur la page d'inscription

// il faudrait voir si on a authToken dans le context Auth (useAuth)
// pour naviger sur la page d'inscription, on va utiliser useNavigate
// quand jarrive sur la homepage, je peux executer du code au premier rendu, avec useEffect

const HomePage = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  // useEffect avec tableau
  useEffect(() => {
    // si on a pas de token, on redirige
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <VStack paddingLeft={15} paddingRight={15} alignItems="center">
      <CircleLogo width={200} height={200} />
      <Text>
        Tu es sur la page d'accueil. Si tu vois ca bravo, tu es connecté
      </Text>
    </VStack>
  );
};

export default HomePage;
