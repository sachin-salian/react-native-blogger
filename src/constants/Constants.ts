import { Dimensions } from "react-native";

export const DEVICE_WIDTH = Dimensions.get("window").width;
export const DEVICE_HEIGHT = Dimensions.get("window").height;

export const Routes = {
  Login: "Login",
  Home: "Home",
  Blog: "Blog",
};

export const Themes = {
  light: "light",
  dark: "dark",
};

export const Colors = {
  border: "#808080",
  error: "red",
};
