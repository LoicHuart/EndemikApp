import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

<<<<<<< HEAD
import { home, TestScreen } from './screens/';
=======
import { HomeScreen, NotificationsScreen } from './screens/';
>>>>>>> parent of 312d3d4 (testScreen)




const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Drawer.Navigator initialRouteName="home">
        <Drawer.Screen name="home" component={home} />
        <Drawer.Screen name="TestScreen" component={TestScreen} />
=======
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
>>>>>>> parent of 312d3d4 (testScreen)
      </Drawer.Navigator>
    </NavigationContainer>
  );
}