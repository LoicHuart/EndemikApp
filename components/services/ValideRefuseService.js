import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import color from "../../constants/color";
import { screen } from "../../styles";
import { AuthContext } from "../../context/AuthContext";
import { deleteServiceApi } from "../../requestApi/";

export const ValideRefuseService = ({ itemId, text, toggleOverlay }) => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);
  const [resultDeleteService, setResultDeleteService] = React.useState([]);

  const deleteService = async (id) => {
    if (!loading) {
      setLoading(true);
      deleteServiceApi(token, id)
        .then((result) => {
          setResultDeleteService(result);
        })
    } else {
      console.log("loading");
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [resultDeleteService]);

  useEffect(() => {
    // console.log(loading)
    // console.log(resultDeleteService)
    if (resultDeleteService.message && !resultDeleteService.error && !loading) {
      toggleOverlay();
    }
  }, [loading]);

  return (
    <View>
      <Text style={screen.title}>{text}</Text>
      {resultDeleteService.code == "47" && <Text style={screen.error}>ID service non valide</Text>}
      {resultDeleteService.code == "48" && <Text style={screen.error}>Impossible de supprimer ce service</Text>}
      {resultDeleteService.code == "49" && <Text style={screen.error}>Impossible de supprimer le service car un employé est lié à celui ci</Text>}

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
            onPress={() => deleteService(itemId)}
            title="Valider"
            buttonStyle={loading ? '' : screen.buttonSuccess}
            loading={loading ? true : false}
            type={loading ? 'clear' : 'solid'}
          />
        </View>
      </View>
    </View>
  );
};
