import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { HeaderCustom } from "../../components/";

export const dashbord = ({ navigation }) => {
  return (
    <View>
      <HeaderCustom />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>dashbord</Text>
        <Button onPress={() => navigation.goBack()} title="Go Back" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
