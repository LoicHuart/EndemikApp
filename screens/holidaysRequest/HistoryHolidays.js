import React from "react";
import { View, Text } from "react-native";
import { HeaderCustom, ListHolidays, Card } from "../../components/";
import { AuthContext } from "../../context/AuthContext";
import { screen } from "../../styles/";

export const holidaysHistory = ({ navigation }) => {
  const { user, token } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <View style={{ flex: 93 }}>
        <Card>
          <Text style={screen.h2}>
            Liste des congés :
          </Text>
          <ListHolidays
            token={token}
            user={user}
            status={["validé", "prévalidé", "en attente", "refusé", "annulé"]}
          />
        </Card>
      </View>
      <View style={{ flex: 7 }}>
      </View>
    </View>
  );
};