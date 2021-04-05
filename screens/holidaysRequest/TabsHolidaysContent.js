import * as React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { holidaysRequest } from "./holidaysRequest";
import { holidaysHistory } from "./HistoryHolidays";
import { Icon, Button, Input } from "react-native-elements";
import color from "../../constants/color";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export const TabsHolidaysContent = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor;

          if (route.name === "Demandes") {
            iconName = focused ? "calendar-plus" : "calendar-plus";
            iconColor = focused ? color.COLORS.PRIMARY : color.COLORS.GREY;
          } else if (route.name === "Historique") {
            iconName = focused ? "history" : "history";
            iconColor = focused ? color.COLORS.PRIMARY : color.COLORS.GREY;
          }
          // You can return any component that you like here!
          return (
            <Icon name={iconName} type="font-awesome-5" color={iconColor} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Demandes" component={holidaysRequest} />
      <Tab.Screen name="Historique" component={holidaysHistory} />
    </Tab.Navigator>
  );
};
