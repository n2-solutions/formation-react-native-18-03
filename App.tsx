import * as React from "react";
import { NativeRouter, Route, Routes } from "react-router-native";
import { config } from "@gluestack-ui/config";
import StorybookUIRoot from "./.storybook";
import { GluestackUIProvider, SafeAreaView } from "@gluestack-ui/themed";
import Constants from "expo-constants";
import { StyleSheet, Platform, StatusBar } from "react-native";
import { AuthProvider } from "./context/Auth";

import useAndroidBackButtonHandler from "./hooks/useAndroidBackButtonHandler";
import Header from "./components/layout/Header/Header";

import HomePage from "./pages/Home/Home";
import SignupPage from "./pages/Signup/Signup";
import LoginPage from "./pages/Login/Login";
import WorkoutListPage from "./pages/WorkoutList/WorkoutList";
import WorkoutDetailPage from "./pages/WorkoutDetail/WorkoutDetail";
import CreateWorkoutPage from "./pages/CreateWorkout/CreateWorkout";
import EditWorkoutPage from "./pages/EditWorkout/EditWorkout";
import StartSessionPage from "./pages/StartSession/StartSession";
import OngoingSessionPage from "./pages/OngoingSession/OngoingSession";
import WorkoutSessionHistoryPage from "./pages/WorkoutSessionHistory/WorkoutSessionHistory";

const globalStyles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

function BackButtonHandler() {
  useAndroidBackButtonHandler();

  return null;
}

export default function App() {
  if (Constants.expoConfig?.extra?.isStorybook) {
    return <StorybookUIRoot />;
  } else {
    return (
      <AuthProvider>
        <GluestackUIProvider config={config}>
          <SafeAreaView style={globalStyles.AndroidSafeArea}>
            <NativeRouter>
              {Platform.OS === "android" ? <BackButtonHandler /> : null}
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/workouts" element={<WorkoutListPage />} />
                <Route path="/workout/new" element={<CreateWorkoutPage />} />
                <Route
                  path="/workout/:workoutId"
                  element={<WorkoutDetailPage />}
                />
                <Route
                  path="/workout/:workoutId/edit"
                  element={<EditWorkoutPage />}
                />
                <Route
                  path="/workout/:workoutId/session/:sessionId"
                  element={<OngoingSessionPage />}
                />
                <Route
                  path="/workout/:workoutId/start-session"
                  element={<StartSessionPage />}
                />
                <Route
                  path="/workout/:workoutId/view-stats"
                  element={<WorkoutSessionHistoryPage />}
                />
              </Routes>
            </NativeRouter>
          </SafeAreaView>
        </GluestackUIProvider>
      </AuthProvider>
    );
  }
}
