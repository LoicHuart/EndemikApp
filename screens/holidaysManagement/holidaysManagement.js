import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  HeaderCustom,
  ListHolidays,
  ListHolidaysManager,
  Card,
} from "../../components/";
import { screen } from "../../styles/";
import { AuthContext } from "../../context/AuthContext";

export const holidaysManagement = ({ navigation }) => {
  const { user, token } = React.useContext(AuthContext);
  if (
    user.id_role.name == "rh" ||
    user.id_role.name == "direction" ||
    user.id_role.name == "DEV"
  ) {
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
          <ListHolidays token={token} status="prévalidé" gestion={true} />
        </Card>
      </View>
    );
  } else if (user.isManager == true) {
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
          <ListHolidaysManager token={token} />
        </Card>
      </View>
    );
  }
};

const styles = StyleSheet.create({});
