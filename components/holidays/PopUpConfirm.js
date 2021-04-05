import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

import color from "../../constants/color";

export const PopUpConfirm = () => {
  return (
    <View>
      <Icon
        style={styles.row}
        name="check-circle"
        type="font-awesome-5"
        color={color.COLORS.SUCCESS}
      />
      <Text style={styles.row}>Demande de congés envoyée</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    marginTop: 20,
    flexDirection: "row",
    marginBottom: 20,
    alignSelf: "center",
  },
});
