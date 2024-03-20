import { useState } from "react";
import { useAuth } from "../context/Auth";

const useApi = () => {
  // notre context useAuth
  const { token, setToken } = useAuth();
  // nos states loading et erreur
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // TODO trouver le type
  const headers: any = { "Content-Type": "application/json" };

  // ma fonction pour faire la requete
  const request = async (url: string, method: string, body?: object) => {
    // rajouter dans les headers le header Authorization, et y mettre le token, si existant
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      // je vais faire la requete, je me met en chargement
      setIsLoading(true);
      // je fais l'appel avec fetch
      const response = await fetch(process.env.EXPO_PUBLIC_XANO_API_URL + url, {
        method: method,
        headers,
        body: JSON.stringify(body),
      });
      // je decode le body en JSON
      const result = await response.json();

      // si j'arrive ici, ma requete est terminée
      setIsLoading(false);
      // Si on ne recoit pas un code de type 2xx
      if (!response.ok) {
        setErrorMessage(result.message);

        throw new Error(result.message);
      } else {
        // si la requete est sur login ou signup, et qu'elle a reussi, on va stocker le token dans le contexte
        if (
          (url === "/auth/login" || url === "/auth/signup") &&
          result.authToken
        ) {
          setToken(result.authToken);
        }
        setErrorMessage(null);
      }
      // je renvoie le result, pour utilisation dans le composant
      return result;
    } catch (error) {
      console.log("Error generale !", error);
      throw new Error("Unknown error");
      setIsLoading(false);
    }
  };

  // j'expose la fonction et les states de mon hook
  return { request, isLoading, errorMessage };
};

export default useApi;
