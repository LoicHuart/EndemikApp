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
import color from "../constants/color";
import { FormAddUser } from "./FormAddUser";
import { Avatar, Icon } from "react-native-elements";

export const CardEmployee = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
              trackColor={{ false: "#808080", true: "#808080" }}
              thumbColor={isEnabled ? "#D3D3D3" : "#D3D3D3"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.icon}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text>Etes-vous sur de vouloir supprimer ce salarié ?</Text>
                  <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Oui</Text>
                  </Pressable>
                  <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Annuler</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Icon
              name="trash"
              type="font-awesome-5"
              color={color.COLORS.GREY}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardEmployee: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: color.COLORS.WHITE,
    borderColor: color.COLORS.GREY,
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
    flex: 0.5,
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
