import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Dimensions } from "react-native";
import { CardService } from "./CardService";
import { AuthContext } from "../../context/AuthContext";

export const ListServices = ({ refresh }) => {
  const { token } = useContext(AuthContext);
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const displayServices = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
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

  useEffect(() => {
    displayServices();
  }, [refresh]);

  return (
    <View>
      <FlatList
        data={services}
        ListEmptyComponent={() => <Text>rien</Text>}
        refreshing={loading}
        onRefresh={() => displayServices()}
        renderItem={({ item }) => (
          <CardService item={item} refreshService={displayServices} />
        )}
        keyExtractor={(item) => item._id}
        style={{ height: Dimensions.get("window").height - 150 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
