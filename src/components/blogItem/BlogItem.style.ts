import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Constants";

const styles = StyleSheet.create({
  itemView: {
    flexDirection: "row",
    flex: 1,
    marginTop: 0,
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: Colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  leftView: {
    flex: 3,
  },
  rightView: {
    flex: 1,
    alignItems: "flex-end",
  },
  authorView: { flexDirection: "row", alignItems: "center" },
  blogAuther: {
    fontSize: 14,
    fontFamily: "Roboto-Light",
    marginBottom: 5,
    marginLeft: 5,
  },
  blogTitle: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    marginBottom: 8,
    textTransform: "capitalize",
  },
  blogTime: {
    fontSize: 12,
    fontFamily: "Roboto-Light",
  },
  blogImage: {
    height: 60,
    width: 70,
    borderRadius: 20,
  },
  icon: { width: 14, height: 14, marginBottom: 5 },
});

export default styles;
