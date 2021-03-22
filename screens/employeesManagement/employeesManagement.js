import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { HeaderCustom, ListEmployees, Card } from "../../components/";
export const employeesManagement = ({ navigation }) => {
  const [overlayAdd, setOverlayAdd] = React.useState(false);

  const toggleOverlayAdd = () => {
    setOverlayAdd(!overlayAdd);
  };
  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} title="Gestion des utililsateurs" />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ListEmployees />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
