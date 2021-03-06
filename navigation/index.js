import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import {
  dashbord,
  TabsHolidaysManagement,
  login,
  profil,
  employeesManagement,
  DrawerContent,
  servicesManagement,
  TabsHolidaysContent,
} from "../screens/";
//drawer
const Drawer = createDrawerNavigator();
//satck
const Stack = createStackNavigator();

function RootNavigation() {
  const { token } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!token ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={login} header="" />
        </Stack.Navigator>
      ) : (
        <Drawer.Navigator
          drawerType="slide"
          drawerStyle={{
            width: "100%",
          }}
          overlayColor={0}
          initialRouteName="dashbord"
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="dashbord" component={dashbord} />
          <Drawer.Screen
            name="TabsHolidaysManagement"
            component={TabsHolidaysManagement}
          />
          <Drawer.Screen
            name="TabsHolidaysContent"
            component={TabsHolidaysContent}
          />
          <Drawer.Screen name="profil" component={profil} />
          <Drawer.Screen
            name="employeesManagement"
            component={employeesManagement}
          />
          <Drawer.Screen
            name="servicesManagement"
            component={servicesManagement}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}

export default RootNavigation;
