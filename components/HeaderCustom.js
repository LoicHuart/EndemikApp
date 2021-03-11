import React from "react";
import { Header } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

export const HeaderCustom = (props) => {
  return (
    <Header
      statusBarProps={{ barStyle: "light-content" }}
      barStyle="light-content" // or directly
      leftComponent={
        <Entypo
          name="menu"
          size={24}
          color="white"
          onPress={props.navigation.openDrawer()}
        />
      }
      centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
      containerStyle={{
        backgroundColor: "#3D6DCC",
        justifyContent: "space-around",
      }}
    />
  );
};
