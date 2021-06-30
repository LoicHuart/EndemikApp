import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { HeaderCustom, ListHolidays, Card } from "../../components/";
import { screen } from "../../styles/";
import { AuthContext } from "../../context/AuthContext";

export const holidaysManagement = ({ navigation }) => {
  const { user, token } = React.useContext(AuthContext);

  useEffect(() => {
    console.log(user.id_role.name)
  })
  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <View style={{ flex: 93 }}>
        <Card style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }} >
            <Text style={screen.h2} >
              Liste des congés :
            </Text>
          </View>
          <ListHolidays
            token={token}
            status={user.isManager ? ["en attente"] : ["prévalidé"]}
            gestionRole={user.isManager ? "manager" : user.id_role.name}
          />
        </Card>
      </View>
      <View style={{ flex: 7 }}>
      </View>
    </View>
  );
};