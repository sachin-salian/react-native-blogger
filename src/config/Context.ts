import React from "react";
import { Themes } from "../constants/Constants";

export const UserContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: (status: boolean) => {},
  theme: Themes.dark,
  toggleTheme: () => {},
});
