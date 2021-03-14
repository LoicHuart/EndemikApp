import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { HeaderCustom, FormHolidaysRequest } from "../../components/";
export const holidaysRequest = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} title="HOLIDAYS REQUEST" />
      <FormHolidaysRequest />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>holidaysRequest</Text>
        <Button onPress={() => navigation.goBack()} title="Go Back" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
