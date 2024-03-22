import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const defaultAuthContext: AuthContextType = {
  token: null,
  setToken: () => null,
};

export const AuthContext = createContext(defaultAuthContext);

// Create a provider component
type AuthProviderProps = {
  children: ReactNode;
};

// je cree le provider qui permet d'acceder a mon contexte partout
export function AuthProvider(props: AuthProviderProps) {
  // dedans, jai un state qui stockera mon token.
  const [token, setToken] = useState<string | null>(null);

  // sauvegarde notre token dans le state ET dans l'async storage
  const setTokenAndPersist = (newToken: string | null) => {
    setToken(newToken);
    if (newToken === null) {
      AsyncStorage.removeItem("authToken");
    } else {
      AsyncStorage.setItem("authToken", newToken);
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");

        console.log("storedToken", storedToken);

        if (storedToken !== null) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Failed to load the token from AsyncStorage", error);
      }
    };

    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken: setTokenAndPersist }}>
      {props.children}
    </AuthContext.Provider>
  );
}

// Create a custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  // un hook cusstom tout simple, qui nous evitera de devoir importer authContext ET useContext
  const context = useContext(AuthContext);

  return context;
};
