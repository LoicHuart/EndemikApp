import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { HeaderCustom } from "../../components/";
export const usersManagement = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>usersManagement</Text>
        <Button onPress={() => navigation.goBack()} title="Go Back" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
