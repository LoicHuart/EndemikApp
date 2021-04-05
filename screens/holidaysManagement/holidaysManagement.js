import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { HeaderCustom, ListHolidays } from "../../components/";
import { AuthContext } from "../../context/AuthContext";

export const holidaysManagement = ({ navigation }) => {
  const { user, token } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <View style={{ flex: 1 }}>
        <ListHolidays token={token} status="prevalidé" gestion={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
