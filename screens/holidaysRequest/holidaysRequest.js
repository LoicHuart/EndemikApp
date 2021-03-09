import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export const holidaysRequest = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>holidaysRequest</Text>
      <Button
        onPress={() => navigation.goBack()}
        title="Go Back"
      />
    </View>
  );
};



const styles = StyleSheet.create({});
