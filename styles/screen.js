import { StyleSheet } from "react-native";
import color from "../constants/color";

export const screen = StyleSheet.create({
  title: {
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    backgroundColor: color.COLORS.SECONDARY,
    alignSelf: "flex-start",
    alignSelf: "center",
  },
  overlay: {
    padding: 15,
    borderRadius: 10,
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
