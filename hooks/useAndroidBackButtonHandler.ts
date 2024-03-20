import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useNavigate } from "react-router-native";

const useAndroidBackButtonHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const backAction = () => {
      navigate(-1); // Go back to the previous screen
      return true; // Prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, [navigate]);
};

export default useAndroidBackButtonHandler;
