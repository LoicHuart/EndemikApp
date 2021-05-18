import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { HeaderCustom, ListHolidays, Card } from "../../components/";
import { AuthContext } from "../../context/AuthContext";
import { screen } from "../../styles/";

export const holidaysHistory = ({ navigation }) => {
  const { user, token } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <Card style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              screen.h2,
              {
                flex: 0.9,
              },
            ]}
          >
            Liste des congés :
          </Text>
        </View>
        <ListHolidays token={token} user={user} gestion={false} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({});
