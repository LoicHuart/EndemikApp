import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Icon, Overlay } from "react-native-elements";
import color from "../../constants/color";
import { Pressable } from "react-native";
import { screen } from "../../styles/";
import { ValideRefuseService } from "./ValideRefuseService";
import { EditService } from "./EditService";
import { getEmployeeApi } from "../../requestApi/";
import { AuthContext } from "../../context/AuthContext";

export const CardService = ({ item, refreshService }) => {
  const { token } = useContext(AuthContext);
  const [overlayDelete, setOverlayDelete] = React.useState(false);
  const [overlayEdit, setOverlayEdit] = React.useState(false);
  const [resultGetEmployees, setResultGetEmployees] = React.useState([]);

  const toggleOverlayDelete = () => {
    setOverlayDelete(!overlayDelete);
    refreshService();
  };

  const toggleOverlayEdit = async () => {
    await getAllEmployee()
    setOverlayEdit(!overlayEdit);
    refreshService();
  };

  const getAllEmployee = async () => {
    await getEmployeeApi(token, true)
      .then((result) => {
        let array = [];
        result.forEach((elem) => {
          array.push({
            label: `${elem.firstName} ${elem.lastName}`,
            value: elem._id,
          });
        });
        console.log(array)
        setResultGetEmployees(array);
      })
  };

  return (
    <View>
      <View style={styles.cardTop}>
        <Text style={styles.service}>{item.name}</Text>
        <Text>Manageur : </Text>
        <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
          <Avatar
            rounded
            source={{
              uri: `http://${process.env.REACT_APP_API_HOST}/uploads/${item.id_manager.photo_url}`,
            }}
            size="medium"
            title={item.id_manager.firstName[0] + item.id_manager.lastName[0]}
          />
          <Text style={styles.firstName}>{item.id_manager.firstName}</Text>
          <Text>{item.id_manager.lastName}</Text>
        </View>
      </View>
      <View style={styles.cardBot}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Pressable
            style={{ flex: 0.5 }}
            onPress={toggleOverlayEdit}
          >
            <Icon
              name='edit'
              type='font-awesome-5'
              color={color.COLORS.GREY}
            />
          </Pressable>
          <Pressable
            style={{ flex: 0.5 }}
            onPress={toggleOverlayDelete}
          >
            <Icon
              name='trash'
              type='font-awesome-5'
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
        <EditService toggleOverlayEdit={toggleOverlayEdit} service={item} allEmployee={resultGetEmployees} />
      </Overlay>

      <Overlay
        isVisible={overlayDelete}
        onBackdropPress={toggleOverlayDelete}
        overlayStyle={screen.overlay}
      >
        <ValideRefuseService
          itemId={item._id}
          text={"Voulez-vous supprimer ce service ?"}
          toggleOverlay={toggleOverlayDelete}
        />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  cardTop: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: color.COLORS.LIGHTGREY,
    padding: 10,

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: color.COLORS.GREY,
    borderWidth: 1,
  },
  cardBot: {
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: color.COLORS.LIGHTGREY,
    padding: 5,

    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: color.COLORS.GREY,
    borderWidth: 1,
    borderTopWidth: 0,
  },
  firstName: {
    textTransform: "capitalize",
    marginRight: 5,
    marginLeft: 20,
  },
  service: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
  },
});
