import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import color from "../../constants/color";
import { AuthContext } from "../../context/AuthContext";

export const ValidateRefuseHoliday = ({ item, toggleShowPopUp }) => {
  const { token } = useContext(AuthContext);

  const acceptHoliday = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: "",
      redirect: "follow",
    };

    fetch(
      `http://${process.env.REACT_APP_API_HOST}/api/holidays/status/validé/${item._id}`,
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

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: "",
      redirect: "follow",
    };

    fetch(
      `http://${process.env.REACT_APP_API_HOST}/api/holidays/status/refusé/${item._id}`,
      requestOptions
    )
      .then((response) => response.text())
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
          onPress={() => {
            acceptHoliday();
            toggleShowPopUp();
          }}
          buttonStyle={styles.buttonValidate}
        />
      </View>
      <View style={{ margin: 5 }}>
        <Button
          title="Refuser"
          onPress={() => {
            refuseHoliday();
            toggleShowPopUp();
          }}
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