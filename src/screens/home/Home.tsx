import React, { useContext, useEffect, useState } from "react";
import {
  Icon,
  Layout,
  Text,
  Toggle,
  TopNavigationAction,
} from "@ui-kitten/components";
import { Alert, FlatList } from "react-native";
import blogData from "../../../src/data/blogData.json";
import Header from "../../components/header/Header";
import { IBlogData } from "../../constants/Schema";
import { NavigationProp } from "@react-navigation/native";
import { Routes, Themes } from "../../constants/Constants";
import BlogItem from "../../components/blogItem/BlogItem";
import styles from "./Home.style";
import LottieView from "lottie-react-native";
import { UserContext } from "../../config/Context";
import dataStore from "../../utils/DataStore";

type HomeNav = {
  [Routes.Home]: undefined;
};

type BlogData = {
  blogs: IBlogData[];
};

interface HomeProps {
  navigation: NavigationProp<HomeNav>;
}

const Home = (props: HomeProps) => {
  const { blogs } = blogData as BlogData;
  const [showLoader, setShowLoader] = useState(true);
  const userContext = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 5000);
  }, []);

  const onLogout = async () => {
    const isRemoved = await dataStore.removeValue("user");
    if (!!isRemoved) {
      userContext.setIsLoggedIn(false);
    }
  };

  const onPressLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Yes",
          onPress: onLogout,
          style: "default",
        },
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  const onChangeTheme = (value: string) => {
    userContext.toggleTheme();
  };

  const renderItem = ({ item }: { item: IBlogData }) => {
    return <BlogItem {...item} />;
  };

  const HeaderRightView = () => (
    <Layout style={styles.headerRightView}>
      <Text style={styles.darkText}>Dark</Text>
      <Toggle
        style={styles.toggle}
        checked={userContext.theme === Themes.dark}
        onChange={onChangeTheme}
      />
      <Layout style={styles.logoutView} />
      <TopNavigationAction
        onPress={onPressLogout}
        icon={<Icon name="log-out" />}
      />
    </Layout>
  );

  const initialLoader = () => (
    <Layout style={styles.mainContainer} level="4">
      <LottieView
        source={require("../../../assets/animations/RN-Blogger.json")}
        autoPlay
        loop
      />
    </Layout>
  );

  return showLoader ? (
    initialLoader()
  ) : (
    <Layout style={styles.mainContainer}>
      <Header
        title="Home"
        showBackArrow={false}
        rightAccessory={HeaderRightView}
      />
      <FlatList
        data={blogs}
        keyExtractor={(item, index) => item?.title + item?.imageUrl}
        renderItem={renderItem}
        contentContainerStyle={styles.listView}
      />
    </Layout>
  );
};

export default Home;
