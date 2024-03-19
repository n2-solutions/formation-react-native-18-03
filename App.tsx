import * as React from "react";

import { config } from "@gluestack-ui/config";
import StorybookUIRoot from "./.storybook";
import { GluestackUIProvider, SafeAreaView } from "@gluestack-ui/themed";
import Constants from "expo-constants";
import { StyleSheet, Platform, StatusBar } from "react-native";
import SignupPage from "./pages/Signup/Signup";
import { AuthProvider } from "./context/Auth";

const globalStyles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default function App() {
  // if (Constants.expoConfig?.extra?.isStorybook) {
  //   return <StorybookUIRoot />;
  // } else {
  return (
    <AuthProvider>
      <GluestackUIProvider config={config}>
        <SafeAreaView style={globalStyles.AndroidSafeArea}>
          <SignupPage />
        </SafeAreaView>
      </GluestackUIProvider>
    </AuthProvider>
  );
  // }
}
