import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";

export const ListHolidays = () => {
  const [holidays, setHolidays] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const displayHolidays = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDI2NWMzNTlkMTZiODJhNmM4MDFmMGMiLCJpYXQiOjE2MTQ1MzQ1MTl9.IvVNv2189ezpH7wTvp9ACdG97WPn0Tlb5rigxKeKmGI"
    );

    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const resp = await fetch(
        "http://192.168.1.13:8080/api/holidays?populate=1",
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
    <View>
      <Text style={{ marginBottom: 30, fontWeight: "bold" }}>
        Liste des congées en cours :
      </Text>
      <FlatList
        data={holidays}
        ListEmptyComponent={() => <Text>rien</Text>}
        refreshing={loading}
        onRefresh={() => displayHolidays()}
        renderItem={({ item }) => (
          <Text>
            {" "}
            Demande de congée d'id : {item._id}, de
            {item.id_requester_employee.lastName}{" "}
            {item.id_requester_employee.firstName}, "{item.status}"
          </Text>
        )}
        keyExtractor={(item) => item._id}
      />
      {/* <Button title="actualiser" onPress={() => displayHolidays()} /> */}
    </View>
  );
};

const styles = StyleSheet.create({});
