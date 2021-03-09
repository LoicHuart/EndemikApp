import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export const login = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>login</Text>
      <Button
        onPress={() => navigation.goBack()}
        title="Go Back"
      />
    </View>
  );
};



const styles = StyleSheet.create({});
