import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { HeaderCustom } from "../../components/";

import { AuthContext } from "../../context/AuthContext";

export const dashbord = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} title="DASHBORD" />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>dashbord</Text>
        <Button onPress={() => navigation.goBack()} title="Go Back" />

        <Button title="signOut" onPress={signOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
