import React from "react";
import { StyleSheet, View } from "react-native";
import color from "../constants/color";
import { Dimensions } from "react-native";

export const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 10,
    marginTop: 15,
    backgroundColor: color.COLORS.LIGHTGREY,
    width: Dimensions.get("window").width - 30,
    borderRadius: 15,
    padding: 15,
  },
});
