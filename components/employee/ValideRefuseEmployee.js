import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import color from "../../constants/color";
import { screen } from "../../styles";
import { AuthContext } from "../../context/AuthContext";
import { deleteEmployeeApi } from "../../requestApi/";

export const ValideRefuseEmployee = ({ itemId, text, toggleOverlay }) => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);
  const [resultDeleteEmployee, setResultDeleteEmployee] = React.useState([]);

  const deleteEmployee = async (id) => {
    if (!loading) {
      setLoading(true);
      deleteEmployeeApi(token, id)
        .then((result) => {
          setResultDeleteEmployee(result);
        })
    } else {
      console.log("loading");
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [resultDeleteEmployee]);

  useEffect(() => {
    // console.log(loading)
    // console.log(resultDeleteEmployee)
    if (
      resultDeleteEmployee.message &&
      !resultDeleteEmployee.error &&
      !loading
    ) {
      toggleOverlay();
    }
  }, [loading]);

  return (
    <View>
      <Text style={screen.title}>{text}</Text>
      {resultDeleteEmployee.error && (
        <Text style={{ color: color.COLORS.DANGER, alignSelf: "center" }}>
          Vous ne pouvez pas supprimer cet utilisateur
        </Text>
      )}
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Button
            buttonStyle={screen.buttonDanger}
            title="Annuler"
            onPress={() => toggleOverlay()}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            buttonStyle={screen.buttonSuccess}
            onPress={() => deleteEmployee(itemId)}
            title="Valider"
          />
        </View>
      </View>
    </View>
  );
};
