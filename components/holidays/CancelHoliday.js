import React, { useContext, useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { AuthContext } from "../../context/AuthContext";
import { screen } from "../../styles/";
import { cancelHolidayApi } from "../../requestApi/";

export const CancelHoliday = ({ item, toggleShowPopUpCancel }) => {
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [resultCancelHoliday, setResultCancelHoliday] = useState("");

  const cancelHoliday = () => {
    if (!loading) {
      setLoading(true);
      cancelHolidayApi(item, token).then((result) => {
        setResultCancelHoliday(result);
      });
    } else {
      console.log("Loading");
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [resultCancelHoliday]);

  useEffect(() => {
    if (resultCancelHoliday.message && !resultCancelHoliday.error && !loading) {
      toggleShowPopUpCancel();
    }
  }, [loading]);

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
              toggleShowPopUpCancel();
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
