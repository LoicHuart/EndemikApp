import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { HeaderCustom, AddHoliday, Card } from "../../components/";
import color from "../../constants/color";

export const holidaysRequest = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      {/* <View style={({ flex: 2 }, styles.card)}>
        <Text>Nombre de RTT :</Text>
        <Text>{user.holiday_balance.rtt}</Text>
      </View>
      <View style={({ flex: 5 }, styles.card)}>
        <Text>Nombre de Congés Payés :</Text>
        <Text>{user.holiday_balance.congesPayes}</Text>
      </View> */}
      <View style={{ flex: 5 }}>
        <AddHoliday />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.COLORS.WHITE,
    borderRadius: 15,
    padding: 15,
    margin: 10,
  },
});
