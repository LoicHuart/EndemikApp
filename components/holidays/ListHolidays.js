import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { CardHolidayRh } from "./CardHolidayRh";

export const ListHolidays = () => {
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
        `http://${process.env.REACT_APP_API_HOST}/api/holidays`,
        requestOptions
      );

      const respJSON = await resp.json();

      let array = [];
      respJSON.forEach((item) => {
        if (item.status == "prevalidée") {
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
  };

  useEffect(() => {
    displayHolidays();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [holidays]);

  return (
    <View style={{ marginBottom: 50 }}>
      <Text style={{ fontWeight: "bold" }}>Liste des congées en cours :</Text>
      <FlatList
        data={holidays}
        ListEmptyComponent={() => <Text>rien</Text>}
        refreshing={loading}
        onRefresh={() => displayHolidays()}
        renderItem={({ item }) => <CardHolidayRh item={item} />}
        keyExtractor={(item) => item._id}
      />
      {/* <Button title="actualiser" onPress={() => displayHolidays()} /> */}
    </View>
  );
};

const styles = StyleSheet.create({});
