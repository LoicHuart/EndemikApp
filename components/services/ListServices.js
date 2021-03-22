import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { CardService } from "./CardService";

export const ListServices = () => {
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const displayServices = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDI2NWMzNTlkMTZiODJhNmM4MDFmMGMiLCJpYXQiOjE2MTQ1MzQ1MTl9.IvVNv2189ezpH7wTvp9ACdG97WPn0Tlb5rigxKeKmGI"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://${process.env.REACT_APP_API_HOST}/api/services?populate=1`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        setServices(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    displayServices();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [services]);

  return (
    <View>
      <FlatList
        data={services}
        ListEmptyComponent={() => <Text>rien</Text>}
        refreshing={loading}
        onRefresh={() => displayServices()}
        renderItem={({ item }) => <CardService item={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
