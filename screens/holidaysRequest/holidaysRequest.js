import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  HeaderCustom,
  FormHolidaysAdd,
  ListHolidaysUser,
} from "../../components/";
export const holidaysRequest = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} title="Demande de congé" />
      <View style={{ flex: 1 }}>
        <FormHolidaysAdd />
      </View>

      <View style={{ flex: 1 }}>{/* <ListHolidaysUser /> */}</View>
    </View>
  );
};

const styles = StyleSheet.create({});
