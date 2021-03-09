import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { home, TestScreen } from './screens/';

import { Images, articles, argonTheme } from "./constants";


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="home">
        <Drawer.Screen name="home" component={home} />
        <Drawer.Screen name="TestScreen" component={TestScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}