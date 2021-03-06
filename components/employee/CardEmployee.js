import React, { useState, useContext } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  Switch,
  ScrollView,
} from "react-native";
import color from "../../constants/color";
import { screen } from "../../styles/";
import { EditEmployee } from "./EditEmployee";
import { Avatar, Icon, Overlay } from "react-native-elements";
import { ValideRefuseEmployee } from "./ValideRefuseEmployee";
import { updateEmployeeApi, getServiceApi, getRolesApi, getAllTitleEmployee } from "../../requestApi";
import { AuthContext } from "../../context/AuthContext";

export const CardEmployee = ({ item, refreshEmployee }) => {
  const { token } = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(item.active);
  const [overlayDelete, setOverlayDelete] = React.useState(false);
  const [overlayEdit, setOverlayEdit] = React.useState(false);
  const [resultGetServices, setResultGetServices] = React.useState([]);
  const [resultGetRoles, setResultGetRoles] = React.useState([]);
  const [resultGetTitles, setResultGetTitles] = React.useState([]);
  const [resultToggleSwitch, setResultToggleSwitch] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const toggleSwitch = async () => {
    if (!loading) {
      setLoading(true);
      // console.log(!isEnabled);
      var item2 = { ...item }

      item2.active = !isEnabled;
      item2.id_service = item2.id_service._id;
      item2.id_role = item2.id_role._id;

      await updateEmployeeApi(token, item2, item2._id).then((result) => {
        // console.log(result)
        if (!result.error) {
          setIsEnabled(!isEnabled)
        }
        setResultToggleSwitch(result)
        setLoading(false);
      });
    } else {
      console.log("loading");
    }
  };

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

  const toggleOverlayDelete = () => {
    setOverlayDelete(!overlayDelete);
    refreshEmployee();
  };

  const toggleOverlayEdit = async () => {
    await getAllServices();
    await getAllRoles();
    await getAllTitle();
    // console.log(allService);
    setOverlayEdit(!overlayEdit);
    refreshEmployee();
  };

  return (
    <View style={styles.cardEmployee}>
      <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10 }}>
        {resultToggleSwitch.code == "5" && <Text style={screen.error}>Contenue de la requ??te invalide</Text>}
        {resultToggleSwitch.code == "6" && <Text style={screen.error}>ID employ??e non valide</Text>}
        {resultToggleSwitch.code == "7" && <Text style={screen.error}>ID role non valide</Text>}
        {resultToggleSwitch.code == "8" && <Text style={screen.error}>Email d??j?? utili??</Text>}
        {resultToggleSwitch.code == "9" && <Text style={screen.error}>ID service non valide</Text>}
        {resultToggleSwitch.code == "10" && <Text style={screen.error}>Impossible de mettre ?? jour le service de cet employ??, cet employ?? est manager d'un service</Text>}
        {resultToggleSwitch.code == "11" && <Text style={screen.error}>Impossible de d??sactiver cet employ??, cet employ?? est manager d'un service</Text>}
        {resultToggleSwitch.code == "12" && <Text style={screen.error}>Impossible de d??sactiver cet employ??, Cet employ?? a une demande de cong??</Text>}
        {resultToggleSwitch.message && !resultToggleSwitch.error && <Text style={screen.sucess}>Utilisateur modifi??</Text>}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
        <Avatar
          rounded
          source={{
            uri: `http://${process.env.REACT_APP_API_HOST}/uploads/${item.photo_url}`,
          }}
          size="medium"
          activeOpacity={0.7}
          title={item.firstName[0] + item.lastName[0]}
        />
        <Text style={styles.firstName}>{item.firstName}</Text>
        <Text>{item.lastName}</Text>
      </View>
      <View style={styles.cardAddress}>
        <Text> T??l : {item.tel_nb}</Text>
        <Text> Mail : {item.mail}</Text>
      </View>
      <View style={styles.cardButton}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Pressable style={{ flex: 1 }} onPress={toggleOverlayEdit}>
            <Icon name="edit" type="font-awesome-5" color={color.COLORS.GREY} />
          </Pressable>
          <View style={styles.container}>
            <Switch
              trackColor={{ false: color.COLORS.GREY, true: color.COLORS.GREY }}
              thumbColor={isEnabled ? "#adf3ad" : "#f0bebd"}
              ios_backgroundColor={color.COLORS.GREY}
              onValueChange={toggleSwitch}
              value={isEnabled}
              disabled={loading ? true : false}
            />
          </View>
          <Pressable style={{ flex: 1 }} onPress={toggleOverlayDelete}>
            <Icon
              name="trash"
              type="font-awesome-5"
              color={color.COLORS.GREY}
            />
          </Pressable>
        </View>
      </View>

      <Overlay
        isVisible={overlayEdit}
        onBackdropPress={toggleOverlayEdit}
        overlayStyle={screen.overlay}
      >
        <ScrollView>
          <EditEmployee
            toggleOverlayEdit={toggleOverlayEdit}
            employee={item}
            allServices={resultGetServices}
            allTitles={resultGetTitles}
            allRoles={resultGetRoles}
          />
        </ScrollView>
      </Overlay>

      <Overlay
        isVisible={overlayDelete}
        onBackdropPress={toggleOverlayDelete}
        overlayStyle={screen.overlay}
      >
        <ValideRefuseEmployee
          itemId={item._id}
          text={"Voulez-vous supprimer cet utilisateur ?"}
          toggleOverlay={toggleOverlayDelete}
        />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  cardEmployee: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: color.COLORS.LIGHTGREY,
    // padding: 5,

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: color.COLORS.GREY,
    borderWidth: 1,

    borderRadius: 10,
  },
  firstName: {
    textTransform: "capitalize",
    marginRight: 5,
    marginLeft: 20,
  },
  cardButton: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    padding: 5,

    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: color.COLORS.GREY,
    borderWidth: 0,
    borderTopWidth: 1,
  },
  cardAddress: {
    margin: 10,
  },
  icon: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
});
