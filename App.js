import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import {
  dashbord,
  holidaysManagement,
  holidaysRequest,
  login,
  profil,
  usersManagement,
} from "./screens/";

import { DrawerContent } from "./screens/DrawerContent";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="dashbord"
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="dashbord" component={dashbord} />
        <Drawer.Screen
          name="holidaysManagement"
          component={holidaysManagement}
        />
        <Drawer.Screen name="holidaysRequest" component={holidaysRequest} />
        <Drawer.Screen name="login" component={login} />
        <Drawer.Screen name="profil" component={profil} />
        <Drawer.Screen name="usersManagement" component={usersManagement} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
