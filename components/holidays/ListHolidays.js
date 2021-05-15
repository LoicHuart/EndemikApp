import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Icon, Overlay, Button } from "react-native-elements";
import { CardHoliday } from "./CardHoliday";
import color from "../../constants/color";

export const ListHolidays = ({ user, status, token, gestion }) => {
  const [holidays, setHolidays] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  if (user === undefined) {
    const displayHolidays = async (status) => {
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

      if (status === undefined) {
        try {
          const resp = await fetch(
            `http://${process.env.REACT_APP_API_HOST}/api/holidays/?populate=1`,
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
      } else {
        try {
          const resp = await fetch(
            `http://${process.env.REACT_APP_API_HOST}/api/holidays/?populate=1`,
            requestOptions
          );

          const respJSON = await resp.json();

          let array = [];
          respJSON.forEach((item) => {
            if (item.status == status) {
              array.push(item);
            }
          });

          if (!resp.ok) {
            console.log("error");
            console.log(resp);
          }
          setHolidays(array);
        } catch (e) {
          console.log(e);
        }
      }
    };

    useEffect(() => {
      displayHolidays(status);
    }, []);

    useEffect(() => {
      setLoading(false);
    }, [holidays]);

    return (
      <View style={{ marginBottom: 50 }}>
        <FlatList
          data={holidays}
          ListEmptyComponent={() => <Text>rien</Text>}
          refreshing={loading}
          onRefresh={() => displayHolidays(status)}
          renderItem={({ item }) => (
            <CardHoliday
              item={item}
              gestion={gestion}
              refreshHolidays={displayHolidays}
            />
          )}
          keyExtractor={(item) => item._id}
        />
        {/* <Button title="actualiser" onPress={() => displayHolidays()} /> */}
      </View>
    );
  } else {
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
        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
          Historique :
        </Text>
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
          renderItem={({ item }) => (
            <CardHoliday
              item={item}
              gestion={gestion}
              refreshHolidays={displayHolidays}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({});
