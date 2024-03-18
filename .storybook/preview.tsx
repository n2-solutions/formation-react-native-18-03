import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

import type { Preview } from "@storybook/react";
import React from "react";

const withGluestackUI = (Story) => (
  <GluestackUIProvider config={config}>
    <Story />
  </GluestackUIProvider>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [withGluestackUI],
};

export default preview;
