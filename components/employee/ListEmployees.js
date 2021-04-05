import React, { useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Dimensions,
} from "react-native";
import { CardEmployee } from "./CardEmployee";
import { AuthContext } from "../../context/AuthContext";

import color from "../../constants/color";

export const ListEmployees = (refresh) => {
  const { token } = useContext(AuthContext);
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const displayEmployees = async () => {
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
        `http://${process.env.REACT_APP_API_HOST}/api/employees?populate=1`,
        requestOptions
      );

      const respJSON = await resp.json();

      if (!resp.ok) {
        console.log("error");
        console.log(resp);
      }
      setEmployees(respJSON);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    displayEmployees();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [employees]);

  useEffect(() => {
    displayEmployees();
  }, [refresh]);

  return (
    <View>
      <FlatList
        data={employees}
        style={{ height: Dimensions.get("window").height - 150 }}
        ListEmptyComponent={() => <Text>rien</Text>}
        refreshing={loading}
        onRefresh={() => displayEmployees()}
        renderItem={({ item }) => (
          <CardEmployee item={item} refreshEmployee={displayEmployees} />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
