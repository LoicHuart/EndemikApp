import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { AuthContext } from "../../context/AuthContext";
import { screen } from "../../styles";
import color from "../../constants/color";

export const ValidatorFormRh = ({ item }) => {
  const { token } = useContext(AuthContext);

  const acceptHoliday = (holiday) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      status: "validée",
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://${process.env.REACT_APP_API_HOST}/api/holidays/status/${item._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const refuseHoliday = (holiday) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      status: "refusée",
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://${process.env.REACT_APP_API_HOST}/api/holidays/status/${item._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  return (
    <View>
      <View style={{ margin: 5 }}>
        <Text>Réponse à la demande</Text>
      </View>
      <View style={{ margin: 5 }}>
        <Button
          title="Accepter"
          onPress={acceptHoliday}
          buttonStyle={styles.buttonValidate}
        />
      </View>
      <View style={{ margin: 5 }}>
        <Button
          title="Refuser"
          onPress={refuseHoliday}
          buttonStyle={styles.buttonRefuse}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonValidate: {
    backgroundColor: color.COLORS.SUCCESS,
  },
  buttonRefuse: {
    backgroundColor: color.COLORS.DANGER,
  },
});
