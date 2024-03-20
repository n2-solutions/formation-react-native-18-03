import useApi from "./useApi";
import { renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react-native";
import { act } from "react-test-renderer";
import { useAuth } from "../context/Auth";

// Mocking useAuth
jest.mock("../context/Auth", () => ({
  useAuth: jest.fn(),
}));

// Mock the global `fetch` function to simulate API calls without making real HTTP requests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  }),
) as jest.Mock;

describe("useApi hook", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      token: "test-token",
      setToken: jest.fn(),
    });
  });

  it("should initiate a GET request and handle loading state", async () => {
    const { result } = renderHook(() => useApi());

    act(() => {
      result.current.request("/test", "GET");
    });

    // Attendre que isLoading devienne true
    await waitFor(() => expect(result.current.isLoading).toBe(true));

    // Et ensuite attendre qu'il redevienne false
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  // Exemple de test pour gérer une erreur
  it("handles request error correctly", async () => {
    // on va mocker, juste pour ce test (ce it..) que fetch nous renvoie un token
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch"),
    );

    const { result } = renderHook(() => useApi());

    await act(async () => {
      await expect(result.current.request("/error", "GET")).rejects.toThrow(
        "Unknown error",
      );
    });

    // Vérifier que isLoading est bien passé à false après une erreur
    expect(result.current.isLoading).toBe(false);
  });

  it("should set the token on login/signup", async () => {
    // on mocke juste pour ce test, une fausse fonction setToken
    // jest.fn() permet de pouvoir faire une assertion pour verifier que la fonction a ete appellee
    // (expect(mockSetToken).toHaveBeenCalledWith("new-token");)
    const mockSetToken = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      token: "",
      setToken: mockSetToken,
    });
    // on va mocker, juste pour ce test (ce it..) que fetch nous renvoie un token
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ authToken: "new-token" }),
    });

    // on render notre hook dans un environnement simulé
    const { result } = renderHook(() => useApi());

    // on wrap notre test dans un act, car il va declencher de nouveaux rendus
    await act(async () => {
      // on fait la requete en elle meme
      await result.current.request("/auth/login", "POST", {
        username: "test",
        password: "test",
      });

      // on verifie que setToken a été appelé
      expect(mockSetToken).toHaveBeenCalledWith("new-token");
    });
  });
});
