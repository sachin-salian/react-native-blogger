import React, { useContext, useState } from "react";
import {
  Button,
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
} from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import { View, ViewProps } from "react-native";
import { Routes } from "../../constants/Constants";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm, Controller } from "react-hook-form";
import styles from "./Login.style";
import { NavigationProp } from "@react-navigation/native";
import dataStore from "../../utils/DataStore";
import { UserContext } from "../../config/Context";

type LoginNav = {
  [Routes.Login]: undefined;
};

interface LoginProps {
  navigation: NavigationProp<LoginNav>;
}

interface LoginData {
  email: string;
  password: string;
}

const Login = (props: LoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const userContext = useContext(UserContext);

  const renderEmailIcon = (props: any) => <Icon {...props} name={"email"} />;

  const renderPasswordIcon = (props: any) => (
    <Icon {...props} name={"eye-off"} />
  );

  const onPressLogin = (data: LoginData) => {
    const { email, password } = data;
    setIsLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then(async (response) => {
      const isSaved = await dataStore.storeData(
        "user",
        JSON.stringify(response)
      );
      if (isSaved) {
        userContext.setIsLoggedIn(true);
      }
      setIsLoading(false);
    });
  };

  const LoadingIndicator = (props: ViewProps) =>
    isLoading ? (
      <View style={[props.style, styles.indicator]}>
        <Spinner animating status="basic" size="small" />
      </View>
    ) : null;

  return (
    <Layout style={styles.container}>
      <Layout style={styles.circleLeft} level="2" />
      <Layout style={styles.circleRight} level="2" />
      <Layout style={styles.headerView}>
        <Text style={styles.headerText}>RN BLOGGER</Text>
      </Layout>
      <View style={styles.inputContainer}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              placeholder="Email"
              style={styles.input}
              accessoryRight={renderEmailIcon}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.errorText}>This is required.</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              placeholder="Password"
              style={styles.input}
              accessoryRight={renderPasswordIcon}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.errorText}>This is required.</Text>
        )}

        <Button
          style={styles.loginButton}
          onPress={handleSubmit(onPressLogin)}
          accessoryRight={LoadingIndicator}
          disabled={isLoading}
        >
          {!isLoading ? "LOGIN" : ""}
        </Button>
      </View>
      <StatusBar style="auto" />
    </Layout>
  );
};

export default Login;
