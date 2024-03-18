jest.mock("react-native", () => {
  const actualReactNative = jest.requireActual("react-native");
  return {
    ...actualReactNative,
    Keyboard: {
      ...actualReactNative.Keyboard,
      addListener: jest.fn(),
    },
    // Ajoutez d'autres remplacements au besoin
  };
});
