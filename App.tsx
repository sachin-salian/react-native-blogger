import React, { useContext, useEffect, useState } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import mapping from "./mapping.json";
import { useFonts } from "expo-font";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import AppStack from "./src/navigation/MainStack";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as Notifications from "expo-notifications";
import { UserContext } from "./src/config/Context";
import { Themes } from "./src/constants/Constants";
import dataStore from "./src/utils/DataStore";
import Constants from "expo-constants";

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.firebaseApiKey,
  projectId: "rn-blogger",
};

let myApp = initializeApp(firebaseConfig);
getAuth(myApp);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [loaded, error] = useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Thin": require("./assets/fonts/Roboto/Roboto-Thin.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto/Roboto-Black.ttf"),
  });

  const [theme, setTheme] = useState<string>(Themes.dark);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const toggleTheme = () => {
    const nextTheme = theme === Themes.light ? Themes.dark : Themes.light;
    setTheme(nextTheme);
  };

  const updateUserSession = async () => {
    const isLoggedIn = await dataStore.getData("user");
    setIsLoggedIn(!!isLoggedIn);
  };

  useEffect(() => {
    updateUserSession();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <UserContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, theme, toggleTheme }}
      >
        <ApplicationProvider
          {...eva}
          theme={eva[theme]}
          customMapping={{ ...eva.mapping, ...mapping }}
        >
          <AppStack />
        </ApplicationProvider>
      </UserContext.Provider>
    </>
  );
};

export default App;
