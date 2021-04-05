import { StyleSheet } from "react-native";
import color from "../constants/color";
import { Dimensions } from "react-native";

export const screen = StyleSheet.create({
  h1: {
    margin: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  h2: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 17,
  },
  button: {
    backgroundColor: color.COLORS.SECONDARY,
    alignSelf: "flex-start",
    alignSelf: "center",
  },
  overlay: {
    padding: 15,
    borderRadius: 10,
    width: Dimensions.get("window").width - 70,
  },
  buttonSuccess: {
    marginTop: 10,
    width: 100,
    alignSelf: "center",
    backgroundColor: color.COLORS.BUTTONSUCCESS,
    color: color.COLORS.BLACK,
  },
  buttonDanger: {
    marginTop: 10,
    width: 100,
    alignSelf: "center",
    backgroundColor: color.COLORS.BUTTONDANGER,
    color: color.COLORS.BLACK,
  },
});
