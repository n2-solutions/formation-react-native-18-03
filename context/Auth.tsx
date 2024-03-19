import { ReactNode, createContext, useContext, useState } from "react";

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

  return (
    <AuthContext.Provider value={{ token, setToken }}>
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
