import React, { useState, useEffect } from "react";
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
import { updateEmployeeApi } from "../../requestApi";

export const CardEmployee = ({ item, refreshEmployee }) => {
  const [isEnabled, setIsEnabled] = useState(item.active);
  // console.log(item.active);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    updateEmployeeApi(!isEnabled);
    console.log(isEnabled);
  };

  const [overlayDelete, setOverlayDelete] = React.useState(false);
  const [overlayEdit, setOverlayEdit] = React.useState(false);

  const toggleOverlayDelete = () => {
    setOverlayDelete(!overlayDelete);
    refreshEmployee();
  };

  const toggleOverlayEdit = () => {
    setOverlayEdit(!overlayEdit);
    refreshEmployee();
  };

  useEffect(() => {
    setIsEnabled(item.active);
  });

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
          title={item.firstName[0] + item.lastName[0]}
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
          <Pressable style={{ flex: 1 }} onPress={toggleOverlayEdit}>
            <Icon name="edit" type="font-awesome-5" color={color.COLORS.GREY} />
          </Pressable>
          <View style={styles.container}>
            <Switch
              trackColor={{ false: color.COLORS.GREY, true: color.COLORS.GREY }}
              thumbColor={isEnabled ? "#adf3ad" : "#f0bebd"}
              ios_backgroundColor={color.COLORS.GREY}
              // onValueChange={toggleSwitch}
              value={isEnabled}
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
          <EditEmployee toggleOverlayEdit={toggleOverlayEdit} employee={item} />
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
