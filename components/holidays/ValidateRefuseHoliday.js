import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import color from "../../constants/color";
import { AuthContext } from "../../context/AuthContext";
import { validateHoliday, refuseHoliday } from "../../requestApi";

export const ValidateRefuseHoliday = ({ item, toggleShowPopUp }) => {
  const { token } = useContext(AuthContext);

  return (
    <View>
      <View style={{ margin: 5 }}>
        <Text>Réponse à la demande</Text>
      </View>
      <View style={{ margin: 5 }}>
        <Button
          title="Accepter"
          onPress={() => {
            validateHoliday(item, token);
            toggleShowPopUp();
          }}
          buttonStyle={styles.buttonValidate}
        />
      </View>
      <View style={{ margin: 5 }}>
        <Button
          title="Refuser"
          onPress={() => {
            refuseHoliday(item, token);
            toggleShowPopUp();
          }}
          buttonStyle={styles.buttonRefuse}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonValidate: {
    backgroundColor: color.COLORS.SUCCESS,
  },
  buttonRefuse: {
    backgroundColor: color.COLORS.DANGER,
  },
});
