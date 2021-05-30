import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { holidaysManagement } from "./holidaysManagement";
import { holidaysManagementHistory } from "./holidaysManagementHistory";
import { Icon } from "react-native-elements";
import color from "../../constants/color";

const Tab = createBottomTabNavigator();

export const TabsHolidaysManagement = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor;

          if (route.name === "En cours") {
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
      <Tab.Screen name="En cours" component={holidaysManagement} />
      <Tab.Screen name="Historique" component={holidaysManagementHistory} />
    </Tab.Navigator>
  );
};
