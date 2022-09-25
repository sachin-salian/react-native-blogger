import { useNavigation } from "@react-navigation/native";
import {
  Layout,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Text,
} from "@ui-kitten/components";
import React, { FC } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./Header.style";

export interface HeaderProps {
  title: string;
  showBackArrow?: boolean;
  rightAccessory?: FC;
}

const Header = (props: HeaderProps) => {
  const { title, showBackArrow = true, rightAccessory } = props;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction
      onPress={onPressBack}
      icon={<Icon name="arrow-back" />}
    />
  );

  return (
    <Layout style={{ marginTop: insets.top }}>
      {showBackArrow ? (
        <TopNavigation
          accessoryLeft={BackAction}
          title={(evaProps) => (
            <Text {...evaProps} style={styles.headerTitle}>
              {title}
            </Text>
          )}
        />
      ) : (
        <TopNavigation
          title={(evaProps) => (
            <Text {...evaProps} style={styles.headerTitle}>
              {title}
            </Text>
          )}
          accessoryRight={rightAccessory}
        />
      )}
    </Layout>
  );
};

export default Header;
