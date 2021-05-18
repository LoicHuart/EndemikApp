import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import color from "../../constants/color";
import { AuthContext } from "../../context/AuthContext";
import { screen } from "../../styles/";

export const CancelHoliday = ({ item, toggleShowPopUp }) => {
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [resultCancelHoliday, setResultCancelHoliday] = useState("");

  const cancelHoliday = () => {
    if (!loading) {
      setLoading(true);
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
        `http://${process.env.REACT_APP_API_HOST}/api/holidays/status/annulé/${item._id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setResultCancelHoliday(result);
        })
        .catch((error) => console.log("error", error));
    } else {
      console.log("Loading");
    }
  };

  useEffect(() => {
    if (resultCancelHoliday.message && !resultCancelHoliday.error && !loading) {
      toggleShowPopUp();
      console.log("toggleShowPopUp");
    }
  }, [loading]);

  useEffect(() => {
    setLoading(false);
  }, [resultCancelHoliday]);

  return (
    <View>
      <View style={{ margin: 5, marginBottom: 10 }}>
        <Text>Voulez-vous annuler votre demande ?</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Button
            title="Retour"
            onPress={() => {
              toggleShowPopUp();
            }}
            buttonStyle={screen.buttonCancel}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="Annuler"
            onPress={() => {
              cancelHoliday();
            }}
            buttonStyle={loading ? "" : screen.button}
            loading={loading ? true : false}
            type={loading ? "clear" : "solid"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonValidate: {
    backgroundColor: color.COLORS.PRIMARY,
  },
  buttonReturn: { borderColor: color.COLORS.PRIMARY, borderWidth: 1 },
});
