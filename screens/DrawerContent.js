import React from "react";
import { View, Text } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { drawer } from "../styles/";
import color from "../constants/color";

export function DrawerContent(props) {
  return (
    <View style={{ flex: 1, backgroundColor: color.COLORS.PRIMARY }}>
      <DrawerContentScrollView {...props}>
        <View style={drawer.drawerContent}>
          <View style={drawer.row}>
            <Text style={drawer.title}>MENU</Text>
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
                iconStyle={drawer.icon}
              />
            )}
            label="Tableau de bord"
            onPress={() => {
              props.navigation.navigate("dashbord");
            }}
            labelStyle={drawer.labelStyle}
          />
          <DrawerItem
            icon={() => (
              <Icon
                name="calendar-plus"
                type="font-awesome-5"
                color={color.COLORS.DEFAULT}
                iconStyle={drawer.icon}
              />
            )}
            label="Demande de congé"
            onPress={() => {
              props.navigation.navigate("TabsHolidaysContent");
            }}
            labelStyle={drawer.labelStyle}
          />
          <DrawerItem
            icon={() => (
              <Icon
                name="calendar-day"
                type="font-awesome-5"
                color={color.COLORS.DEFAULT}
                iconStyle={drawer.icon}
              />
            )}
            label="Gestion des congés"
            onPress={() => {
              props.navigation.navigate("holidaysManagement");
            }}
            labelStyle={drawer.labelStyle}
          />
          <DrawerItem
            icon={() => (
              <Icon
                name="users-cog"
                type="font-awesome-5"
                color={color.COLORS.DEFAULT}
                iconStyle={drawer.icon}
              />
            )}
            label="Gestion des utilisateurs"
            onPress={() => {
              props.navigation.navigate("employeesManagement");
            }}
            labelStyle={drawer.labelStyle}
          />
          <DrawerItem
            icon={() => (
              <Icon
                name="cogs"
                type="font-awesome-5"
                color={color.COLORS.DEFAULT}
                iconStyle={drawer.icon}
              />
            )}
            label="Gestion des services"
            onPress={() => {
              props.navigation.navigate("servicesManagement");
            }}
            labelStyle={drawer.labelStyle}
          />
          <DrawerItem
            icon={() => (
              <Icon
                name="user"
                type="font-awesome-5"
                color={color.COLORS.DEFAULT}
                iconStyle={drawer.icon}
              />
            )}
            label="Mon profil"
            onPress={() => {
              props.navigation.navigate("profil");
            }}
            labelStyle={drawer.labelStyle}
          />

        </View>
      </DrawerContentScrollView>
    </View>
  );
}
