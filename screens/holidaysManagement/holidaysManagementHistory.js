import React from "react";
import { Text, View } from "react-native";
import { HeaderCustom, ListHolidays, Card } from "../../components";
import { screen } from "../../styles";
import { AuthContext } from "../../context/AuthContext";

export const holidaysManagementHistory = ({ navigation }) => {
  const { user, token } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <View style={{ flex: 93 }}>
        <Card>
          <View style={{ flexDirection: "row", alignItems: "center" }} >
            <Text style={screen.h2} >
              Liste des congés :
            </Text>
          </View>
          <ListHolidays
            token={token}
            status={["prévalidé", "validé", "refusé", "en attente", "annulé"]}
            gestionRole={user.id_role.name}
            noTouch={true}
          />
        </Card>
      </View>
      <View style={{ flex: 7 }}>
      </View>
    </View>
  );
};