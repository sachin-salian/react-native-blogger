import React, { useContext, useEffect, useRef, useState } from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login/Login";
import Home from "../screens/home/Home";
import { Routes } from "../constants/Constants";
import Blog from "../screens/blog/Blog";
import * as Notifications from "expo-notifications";
import dataStore from "../utils/DataStore";
import { registerForPushNotificationsAsync } from "../utils/Notifications";
import { UserContext } from "../config/Context";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const userContext = useContext(UserContext);

  const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
  const [notification, setNotification] = useState<boolean | undefined>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const navigationRef = React.createRef<NavigationContainerRef<any>>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        setTimeout(() => {
          navigationRef.current?.navigate(Routes.Blog, {
            data: response?.notification?.request?.content?.data,
          });
        }, 1000);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!userContext.isLoggedIn ? (
          <Stack.Screen name={Routes.Login} component={Login} />
        ) : (
          <>
            <Stack.Screen name={Routes.Home} component={Home} />
            <Stack.Screen name={Routes.Blog} component={Blog} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
