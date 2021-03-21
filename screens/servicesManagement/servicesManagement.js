import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { HeaderCustom, ListServices, Card } from "../../components/";
export const servicesManagement = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} title="SERVICES MANAGEMENT" />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Card>
          <ListServices/>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
