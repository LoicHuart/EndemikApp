import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { HeaderCustom, ListHolidays } from "../../components/";
export const holidaysManagement = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} title="Gestion des congés" />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ListHolidays />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
