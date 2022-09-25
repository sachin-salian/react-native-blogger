import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentView: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  timeReadView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  iconTextView: {
    flexDirection: "row",
    alignItems: "center",
  },
  blogAuther: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    marginBottom: 5,
  },
  blogTitle: {
    fontSize: 24,
    fontFamily: "Roboto-Bold",
    marginTop: 20,
    textTransform: "capitalize",
  },
  blogContent: {
    fontSize: 16,
    fontFamily: "Roboto",
    marginTop: 30,
  },
  blogTime: {
    fontSize: 14,
    fontFamily: "Roboto",
  },
  blogImage: {
    marginTop: 20,
    height: 240,
    width: "100%",
    borderRadius: 10,
  },
  blogViewsCount: {
    fontSize: 14,
    fontFamily: "Roboto",
  },
  iconTime: { width: 14, height: 14, marginRight: 5 },
  iconViews: { width: 14, height: 14, marginRight: 5, marginLeft: 30 },
  iconPerson: { width: 16, height: 16, marginRight: 5 },
});

export default styles;
