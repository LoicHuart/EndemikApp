import React from "react";
import { Header, Icon } from "react-native-elements";
import color from "../constants/color";

export const HeaderCustom = ({ navigation }) => {
  return (
    <Header
      statusBarProps={{
        barStyle: "light-content",
        backgroundColor: color.COLORS.PRIMARY,
      }}
      leftComponent={
        <Icon
          name="bars"
          type="font-awesome-5"
          color={color.COLORS.WHITE}
          onPress={() => navigation.openDrawer()}
        />
      }
      centerComponent={{ text: "BARRE", style: { color: "#fff" } }}
      containerStyle={{
        backgroundColor: color.COLORS.PRIMARY,
        justifyContent: "space-around",
        paddingTop: 0,
      }}
    />
  );
};
