import React from "react";
import { StyleSheet, View } from "react-native";
import color from "../constants/color";

export const CardEmployee = ({ children }) => {
  return <View style={styles.cardEmployee}>{children}</View>;
};

const styles = StyleSheet.create({
  cardEmployee: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: color.COLORS.WHITE,
    borderColor: color.COLORS.GREY,
    padding: 5,

    borderRadius: 10,
  },
});
