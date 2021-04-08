import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

import color from "../../constants/color";

export const PopUpConfirm = () => {
  return (
    <View style={{ marginTop: 30, marginBottom: 20 }}>
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
    flexDirection: "row",
    marginBottom: 10,
    alignSelf: "center",
  },
});
