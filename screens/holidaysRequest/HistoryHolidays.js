import React from "react";
import { StyleSheet, View } from "react-native";
import { HeaderCustom, ListHolidays } from "../../components/";
import { AuthContext } from "../../context/AuthContext";

export const holidaysHistory = ({ navigation }) => {
  const { user, token } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <View style={{ flex: 1 }}>
        <ListHolidays token={token} user={user} gestion={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
