import React from "react";
import { View } from "react-native";
import { HeaderCustom, AddHoliday, Card } from "../../components/";

export const holidaysRequest = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <View style={{ flex: 1 }}>
        <AddHoliday />
      </View>
    </View>
  );
};