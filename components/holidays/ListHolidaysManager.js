import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Icon, Overlay, Button } from "react-native-elements";
import { CardHolidayManager } from "./CardHolidayManager";
import color from "../../constants/color";
import { AuthContext } from "../../context/AuthContext";

export const ListHolidaysManager = ({ token }) => {
  const { user } = useContext(AuthContext);
  const [holidays, setHolidays] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
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
        `http://${process.env.REACT_APP_API_HOST}/api/holidays/service/${user.id_service._id}?populate=1`,
        requestOptions
      );
      const respJSON = await resp.json();

      let array = [];
      respJSON.forEach((item) => {
        if (item.status == "en attente") {
          array.push(item);
        }
      });

      if (!resp.ok) {
        console.log("error");
        console.log(resp);
      }
      console.log(array);
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
      <FlatList
        data={holidays}
        ListEmptyComponent={() => <Text>rien</Text>}
        refreshing={loading}
        onRefresh={() => displayHolidays()}
        renderItem={({ item }) => (
          <CardHolidayManager item={item} refreshHolidays={displayHolidays} />
        )}
        keyExtractor={(item) => item._id}
      />
      {/* <Button title="actualiser" onPress={() => displayHolidays()} /> */}
    </View>
  );
};
const styles = StyleSheet.create({});
