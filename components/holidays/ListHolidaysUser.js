import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { CardHolidayUser } from "./CardHolidayUser";

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
        `http://${process.env.REACT_APP_API_HOST}/api/holidays/user/60525e4ad4679e76a88a43c1`,
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
      <Text style={{ fontWeight: "bold" }}>Liste des congées en cours :</Text>
      <FlatList
        data={holidays}
        ListEmptyComponent={() => <Text>rien</Text>}
        refreshing={loading}
        onRefresh={() => displayHolidays()}
        renderItem={({ item }) => <CardHolidayUser item={item} />}
        keyExtractor={(item) => item._id}
      />
      {/* <Button title="actualiser" onPress={() => displayHolidays()} /> */}
    </View>
  );
};

const styles = StyleSheet.create({});
