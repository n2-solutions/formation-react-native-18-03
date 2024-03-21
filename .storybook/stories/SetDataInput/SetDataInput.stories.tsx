import React from "react";
import SetDataInput from "../../../components/input/SetDataInput";
import { SetData } from "../../../types/exercise";

export default {
  title: "Components/input/SetDataInput",
  component: SetDataInput,
};

export const Default = () => (
  <SetDataInput
    setData={{
      reps: 10,
      weight: 50,
    }}
    updateSetData={function (setData: SetData): void {
      console.log("update set data with", setData);
    }}
    maxReps={10}
    isCalisthenic={false}
  />
);
