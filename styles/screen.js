import { StyleSheet } from "react-native";
import color from "../constants/color";
import { Dimensions } from "react-native";

export const screen = StyleSheet.create({
  h1: {
    margin: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
  },
  h2: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 17,
  },
  button: {
    backgroundColor: color.COLORS.PRIMARY,
    margin: 10,
  },
  buttonCancel: {
    backgroundColor: color.COLORS.GREY,
    margin: 10,
  },
  overlay: {
    padding: 15,
    margin: 15,
    borderRadius: 10,
    width: Dimensions.get("window").width - 70,
  },
  buttonSuccess: {
    // margin: 20,
    // width: 100,
    // alignSelf: "center",
    margin: 10,
    backgroundColor: color.COLORS.BUTTONSUCCESS,
  },
  buttonDanger: {
    // margin: 20,
    // width: 100,
    // alignSelf: "center",
    margin: 10,
    backgroundColor: color.COLORS.BUTTONDANGER,
  },
  error: {
    color: color.COLORS.DANGER,
  },
  sucess: {
    color: color.COLORS.SUCCESS,
  },
  searchBarInputContainerStyle: {
    backgroundColor: color.COLORS.LIGHTGREY,
    borderBottomWidth: 1,
  },
  searchBarContainerStyle: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  errorDropdown: {
    fontSize: 12,
    color: 'red',
    paddingHorizontal: 5,
  }
});
