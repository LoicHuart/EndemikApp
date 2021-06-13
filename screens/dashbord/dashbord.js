import React, { useState, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { HeaderCustom, ListHolidays } from "../../components/";
import { Card } from "../../components/Card";
import { getHolidaysByUserApi } from "../../requestApi/";
import { AuthContext } from "../../context/AuthContext";

export const dashbord = ({ navigation, gestion }) => {
  const { signOut, user, token } = useContext(AuthContext);
  const [hollidays, setHollidays] = useState(null);
  const [hollidayWaiting, setHollidayWaiting] = useState();
  const [hollidayAccept, setHollidayAccept] = useState();

  useEffect(() => {
    const Pendingholliday = async () => {
      await getHolidaysByUserApi(token, user._id, ["en attente", "prévalidé"])
        .then((result) => setHollidayWaiting(result.length))

      await getHolidaysByUserApi(token, user._id, ["validé"])
        .then((result) => setHollidayAccept(result.length))
    };
    Pendingholliday()
  }, [token])

  return (

    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <Card >
          <Text style={{ fontSize: 11 }}>Demande de congés en attente</Text>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 50 }}>{hollidayWaiting}</Text>
            <View style={{ borderRadius: 100, backgroundColor: "orange", padding: 15, margin: 10 }} >
              <Icon
                name="hourglass-half"
                type="font-awesome-5"
                color="white"
                style={{ width: 30 }}
              />
            </View>
          </View>
        </Card>
        <Card>
          <Text style={{ fontSize: 11 }}>Demande de congés traitées</Text>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 50 }}>{hollidayAccept}</Text>
            <View style={{ borderRadius: 100, backgroundColor: "limegreen", padding: 15, margin: 10 }} >
              <Icon
                name="check"
                type="font-awesome-5"
                color="white"
                style={{ width: 30 }}
              />
            </View>
          </View>
        </Card>
      </View>
      <View style={{ flex: 1 }}>
        <Card >
          <ListHolidays third={true} token={token} user={user} noTouch={true} status={["en attente", "prévalidé", "annulé", "validé", "refusé"]} />
        </Card>
      </View>
    </View>

  );
};