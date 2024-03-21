import React from "react";
import WorkoutCard from "../../../components/cards/Workout";

export default {
  title: "Components/cards/WorkoutCard",
  component: WorkoutCard,
};

export const Default = () => (
  <WorkoutCard
    workout={{
      id: 0,
      name: "Test workout",
      description: "Un programme qu'il est bien",
    }}
    onEdit={function (id: number): void {
      console.log("onEdit");
    }}
    onView={function (id: number): void {
      console.log("onView");
    }}
    onStart={function (id: number): void {
      console.log("onStart");
    }}
    onViewStats={function (id: number): void {
      console.log("onViewStats");
    }}
  />
);
