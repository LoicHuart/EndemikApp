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
      <HeaderCustom navigation={navigation} />
      <View style={{ flex: 5 }}>
        <FormHolidaysAdd />
      </View>

      <View style={{ flex: 7 }}>
        <ListHolidaysUser />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
