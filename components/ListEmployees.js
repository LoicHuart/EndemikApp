import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { Card } from "./Card";
import { Icon } from "react-native-elements";
import { CardEmployee } from "./CardEmployee";
import { FontAwesome } from "@expo/vector-icons";

import color from "../constants/color";

export const ListEmployees = () => {
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const displayEmployees = async () => {
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

  return (
    <View>
      <Card>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginTop: 10,
              marginBottom: 20,
              fontWeight: "bold",
              fontSize: 17,
              flex: 0.9,
            }}
          >
            Liste des utilisateurs :
          </Text>
          {/* <FontAwesome
            name="user-plus"
            onPress={() => console.log("addUser")}
            size={15}
            style={{
              alignContent: "center",
              flex: 0.2,
            }}
          /> */}
          <Icon
            raised
            name="user-plus"
            size={17}
            type="font-awesome"
            style={{
              flex: 0.1,
            }}
            onPress={() => console.log("addUser")}
          />
        </View>

        <FlatList
          data={employees}
          ListEmptyComponent={() => <Text>rien</Text>}
          refreshing={loading}
          onRefresh={() => displayEmployees()}
          renderItem={({ item }) => <CardEmployee item={item} />}
          // <CardEmployee style={{ width: 10000 }}>
          //   <Avatar
          //     size="medium"
          //     rounded
          //     source={{
          //       uri:
          //         "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          //     }}
          //     title="MT"
          //     onPress={() => console.log("Works!")}
          //     activeOpacity={0.7}
          //   />
          //   <Text style={{ textTransform: "capitalize" }}>
          //     {item.firstName}
          //   </Text>
          //   <Text>{item.lastName} </Text>
          //   <Text> Tél : {item.tel_nb}</Text>
          //   <Text> Mail : {item.mail}</Text>
          //   {/*               <ButtonGroup
          //     onPress={this.updateIndex}
          //     selectedIndex={selectedIndex}
          //     buttons={buttons}
          //     containerStyle={{ height: 100 }}
          //   /> */}
          // </CardEmployee>

          keyExtractor={(item) => item._id}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({});