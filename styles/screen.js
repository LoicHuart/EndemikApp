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
  },
  overlay: {
    padding: 15,
    borderRadius: 10,
    width: Dimensions.get("window").width - 70,
  },
  buttonSuccess: {
    margin: 10,
    backgroundColor: color.COLORS.BUTTONSUCCESS,
  },
  buttonDanger: {
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
    borderBottomWidth:1
  },
  searchBarContainerStyle: {
    backgroundColor:"transparent", 
    borderTopWidth:0, 
    borderBottomWidth:0
  }

});
