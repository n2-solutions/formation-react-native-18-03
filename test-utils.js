import React from "react";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { render } from "@testing-library/react-native";

const withStyledProvider = (component) => {
  return render(
    <GluestackUIProvider config={config}>{component}</GluestackUIProvider>,
  );
};

export default withStyledProvider;
