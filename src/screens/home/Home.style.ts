import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Constants";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  listView: {
    paddingVertical: 20,
  },
  headerRightView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  darkText: { fontFamily: "Roboto-Black", fontSize: 16 },
  toggle: {
    transform: [{ scale: 0.7 }],
  },
  logoutView: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
    marginHorizontal: 5,
  },
});

export default styles;
