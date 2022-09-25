import { StyleSheet } from "react-native";
import { Colors, DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/Constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circleLeft: {
    height: DEVICE_WIDTH * 1.5,
    width: DEVICE_WIDTH * 1.5,
    position: "absolute",
    top: -DEVICE_WIDTH / 1.5,
    left: -DEVICE_WIDTH / 1.5,
    borderRadius: DEVICE_HEIGHT,
  },
  circleRight: {
    height: DEVICE_WIDTH * 1.5,
    width: DEVICE_WIDTH * 1.5,
    position: "absolute",
    bottom: -DEVICE_WIDTH / 1.5,
    right: -DEVICE_WIDTH / 1.5,
    borderRadius: DEVICE_HEIGHT,
  },
  headerView: { position: "absolute", top: 100, borderRadius: 20 },
  headerText: { fontSize: 44, fontFamily: "Roboto-Black" },
  welcomeText: {
    fontSize: 36,
    fontFamily: "Roboto-Bold",
    alignSelf: "center",
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 30,
    maxWidth: 360,
  },
  titleText: {
    textAlign: "center",
  },
  errorText: {
    color: Colors.error,
    fontFamily: "Roboto-Light",
  },
  input: {
    marginTop: 20,
    marginBottom: 10,
  },
  loginButton: { marginVertical: 20 },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
