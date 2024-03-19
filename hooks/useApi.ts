// qu'est ce quon essaye de faire ?
// un hook generique, pour gerer tous nos calls API

import { useState } from "react";

// ce que jenvoie :
//      je veux gerer differents verbes : GET, POST, PATCH, DELETE
//      je veux pouvoir envoyer un body
//      je veux pouvoir ajouter des headers HTTP, et de base avoir un header content type : json
// je veux pouvoir gerer l'etat de chargement
// je veux pouvoir gerer une erreur
// je veux renvoyer de mon hook, pour usage dans le composant :
// une fonction qui fait la requete
// le loading
// lerreur

const useApi = () => {
  // nos states loading et erreur
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const headers: any = { "Content-Type": "application/json" };

  // ma fonction pour faire la requete
  const request = async (url: string, method: string, body?: object) => {
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

      // Si on ne recoit pas un code de type 2xx
      if (!response.ok) {
        console.log("Erreur serveur :", result.message);
        setErrorMessage(result.message);
      } else {
        console.log("Reussite ", result);
        setErrorMessage(null);
      }
      // si j'arrive ici, ma requete est terminée
      setIsLoading(false);
      // je renvoie le result, pour utilisation dans le composant
      return result;
    } catch (error) {
      console.log("Error generale !", error);
      // si on a eu une grosse erreur... jenleve qd meme le loading
      setIsLoading(false);
    }
  };

  // j'expose la fonction et les states de mon hook
  return { request, isLoading, errorMessage };
};

export default useApi;
