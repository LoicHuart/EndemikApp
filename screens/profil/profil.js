import React, { useEffect, useContext } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { HeaderCustom, Card, Profil } from "../../components/";
import { AuthContext } from "../../context/AuthContext";
import { getServiceApi, getRolesApi, getAllTitleEmployee } from "../../requestApi";

export const profil = ({ navigation }) => {
  const { token } = useContext(AuthContext);
  const [resultGetTitles, setResultGetTitles] = React.useState();

  useEffect(() => {
    const getAllTitle = async () => {
      await getAllTitleEmployee(token)
        .then((result) => {
          setResultGetTitles(result);
        })
    };

    getAllTitle()
  }, [token]);

  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <View style={{ flex: 1 }}>
        <Card>
          <ScrollView >
            {
              resultGetTitles &&
              <Profil
                allTitles={resultGetTitles}
              />
            }
          </ScrollView>
        </Card>
      </View>
    </View>
  );
};