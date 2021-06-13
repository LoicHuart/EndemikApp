import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { holidaysRequest } from "./holidaysRequest";
import { holidaysHistory } from "./HistoryHolidays";
import { Icon } from "react-native-elements";
import color from "../../constants/color";

const Tab = createBottomTabNavigator();

export const TabsHolidaysContent = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor;

          if (route.name === "Demande") {
            iconName = "calendar-plus";
            iconColor = focused ? color.COLORS.PRIMARY : color.COLORS.GREY;
          } else if (route.name === "Historique") {
            iconName = "history";
            iconColor = focused ? color.COLORS.PRIMARY : color.COLORS.GREY;
          }

          return (
            <Icon name={iconName} type="font-awesome-5" color={iconColor} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: color.COLORS.PRIMARY,
        inactiveTintColor: color.COLORS.GREY,
      }}
    >
      <Tab.Screen name="Demande" component={holidaysRequest} />
      <Tab.Screen name="Historique" component={holidaysHistory} />
    </Tab.Navigator>
  );
};
