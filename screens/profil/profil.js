import React, { useEffect, useContext } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { HeaderCustom, Card, Profil } from "../../components/";
import { AuthContext } from "../../context/AuthContext";
import { getServiceApi, getRolesApi, getAllTitleEmployee } from "../../requestApi";

export const profil = ({ navigation }) => {
  const { token } = useContext(AuthContext);
  const [resultGetServices, setResultGetServices] = React.useState();
  const [resultGetRoles, setResultGetRoles] = React.useState();
  const [resultGetTitles, setResultGetTitles] = React.useState();

  useEffect(() => {
    const getAllServices = async () => {
      await getServiceApi(token, true).then((result) => {
        let array = [];
        result.forEach((elem) => {
          array.push({
            label: `${elem.name}`,
            value: elem._id,
          });
        });
        setResultGetServices(array);
      });
    };

    const getAllRoles = async () => {
      await getRolesApi(token).then((result) => {
        let array = [];
        result.forEach((elem) => {
          array.push({
            label: `${elem.name}`,
            value: elem._id,
          });
        });
        setResultGetRoles(array);
      });
    };

    const getAllTitle = async () => {
      await getAllTitleEmployee(token)
        .then((result) => {
          setResultGetTitles(result);
        })
    };

    const test = async () => {
      await getAllServices()
      await getAllTitle()
      await getAllRoles()
    }

    test()
  }, [token]);

  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <View style={{ flex: 1 }}>
        <Card>
          <ScrollView >
            {
              (resultGetServices && resultGetTitles && resultGetRoles) &&

              <Profil
                allServices={resultGetServices}
                allTitles={resultGetTitles}
                allRoles={resultGetRoles}
              />
            }
          </ScrollView>
        </Card>
      </View>
    </View>
  );
};