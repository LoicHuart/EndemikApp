import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
  Switch,
} from "react-native";
import color from "../../constants/color";
import { screen } from "../../styles/";
import { EditEmployee } from "./EditEmployee";
import { Avatar, Icon, Overlay } from "react-native-elements";
import { ValideRefuseEmployee } from "./ValideRefuseEmployee";

export const CardEmployee = ({ item, refreshEmployee }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [overlayDelete, setOverlayDelete] = React.useState(false);

  const toggleOverlayDelete = () => {
    setOverlayDelete(!overlayDelete);
    refreshEmployee();
  };
  // const [overlayAdd, setOverlayAdd] = React.useState(false);

  // const toggleOverlayAdd = () => {
  //   setOverlayAdd(!overlayAdd);
  // };

  return (
    <View style={styles.cardEmployee}>
      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
        <Avatar
          rounded
          source={{
            uri: `http://${process.env.REACT_APP_API_HOST}/uploads/${item.photo_url}`,
          }}
          size="medium"
          activeOpacity={0.7}
        />
        <Text style={styles.firstName}>{item.firstName}</Text>
        <Text>{item.lastName}</Text>
      </View>
      <View style={styles.cardAddress}>
        <Text> Tél : {item.tel_nb}</Text>
        <Text> Mail : {item.mail}</Text>
      </View>
      <View style={styles.cardButton}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <View style={styles.icon}>
            <Icon
              name="edit"
              type="font-awesome-5"
              color={color.COLORS.GREY}
              onPress={() => console.log("Edit")}
            />
          </View>
          <View style={styles.container}>
            <Switch
              trackColor={{ false: color.COLORS.GREY, true: color.COLORS.GREY }}
              thumbColor={isEnabled ? "#adf3ad" : "#f0bebd"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <Pressable
            style={{ flex: 0.5 }}
            // onPress={() => deleteService(item._id)}
            onPress={toggleOverlayDelete}
          >
            <Icon
              name="trash"
              type="font-awesome-5"
              color={color.COLORS.GREY}
              // onPress={() => setModalVisible(true)}
            />
          </Pressable>
        </View>
      </View>
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
      {/* <Overlay isVisible={overlayAdd} onBackdropPress={toggleOverlayAdd}>
        <EditEmployee />
      </Overlay> */}
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
