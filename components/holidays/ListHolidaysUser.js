import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { CardHolidayUser } from "./CardHolidayUser";
import { Icon } from "react-native-elements";
import color from "../../constants/color";

export const ListHolidaysUser = () => {
  const { user, token } = useContext(AuthContext);

  const [holidays, setHolidays] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const displayHolidays = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const resp = await fetch(
        `http://${process.env.REACT_APP_API_HOST}/api/holidays/user/${user._id}`,
        requestOptions
      );

      const respJSON = await resp.json();

      if (!resp.ok) {
        console.log("error");
        console.log(resp);
      }
      setHolidays(respJSON);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    displayHolidays();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [holidays]);

  return (
    <View style={{ marginBottom: 50 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Historique :</Text>
      <FlatList
        data={holidays}
        ListEmptyComponent={() => (
          <View style={{ alignItems: "center" }}>
            <Text style={{ margin: 10 }}>
              Vous n'avez pas encore de demandes
            </Text>
            <Text style={{ color: color.COLORS.GREY }}>
              Balayez vers le bas pour actualiser
            </Text>
            <Icon
              name="angle-double-down"
              type="font-awesome-5"
              color={color.COLORS.GREY}
            />
          </View>
        )}
        refreshing={loading}
        onRefresh={() => displayHolidays()}
        renderItem={({ item }) => <CardHolidayUser item={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
