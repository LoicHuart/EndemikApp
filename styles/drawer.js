import { StyleSheet } from "react-native";
import color from "../constants/color";

export const drawer = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  title: {
    flex: 8,
    fontSize: 20,
    marginTop: 3,
    fontWeight: "bold",
    textAlign: "center",
    color: color.COLORS.DEFAULT,
    marginBottom: 20,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: "bold",
    color: color.COLORS.DEFAULT,
  },
  icon: {
    width:40,
  }
});
