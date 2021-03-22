import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

import color from "../constants/color";

export function DrawerContent(props) {
  return (
    <View style={{ flex: 1, backgroundColor: color.COLORS.PRIMARY }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.row}>
            <Text style={styles.title}>MENU</Text>
            <FontAwesome
              onPress={() => props.navigation.closeDrawer()}
              name="close"
              size={30}
              style={{
                alignContent: "center",
                color: color.COLORS.DEFAULT,
                flex: 1,
              }}
            />
          </View>

          <DrawerItem
            icon={() => (
              <Icon
                name="desktop"
                type="font-awesome-5"
                color={color.COLORS.DEFAULT}
              />
            )}
            label="Tableau de bord"
            onPress={() => {
              props.navigation.navigate("dashbord");
            }}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            icon={() => (
              <Icon
                name="calendar-plus"
                type="font-awesome-5"
                color={color.COLORS.DEFAULT}
              />
            )}
            label="Demande de congé"
            onPress={() => {
              props.navigation.navigate("holidaysRequest");
            }}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            icon={() => (
              <Icon
                name="calendar-day"
                type="font-awesome-5"
                color={color.COLORS.DEFAULT}
              />
            )}
            label="Gestion des congés"
            onPress={() => {
              props.navigation.navigate("holidaysManagement");
            }}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            icon={() => (
              <Icon
                name="users-cog"
                type="font-awesome-5"
                color={color.COLORS.DEFAULT}
              />
            )}
            label="Gestion des utilisateurs"
            onPress={() => {
              props.navigation.navigate("employeesManagement");
            }}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            icon={() => (
              <Icon
                name="cogs"
                type="font-awesome-5"
                color={color.COLORS.DEFAULT}
              />
            )}
            label="Gestion des services"
            onPress={() => {
              props.navigation.navigate("servicesManagement");
            }}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            icon={() => (
              <Icon
                name="user"
                type="font-awesome-5"
                color={color.COLORS.DEFAULT}
              />
            )}
            label="Mon profil"
            onPress={() => {
              props.navigation.navigate("profil");
            }}
            labelStyle={styles.labelStyle}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  title: {
    flex: 8,
    fontSize: 20,
    marginTop: 3,
    fontWeight: "bold",
    textAlign: "center",
    color: color.COLORS.DEFAULT,
    marginBottom: 20,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: "bold",
    color: color.COLORS.WHITE,
  },
});
