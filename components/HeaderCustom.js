import React, { useContext, useEffect } from "react";
import { Header, Icon, Avatar, Tooltip, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import color from "../constants/color";

export const HeaderCustom = ({ navigation, title }) => {
  const { user } = useContext(AuthContext);

  return (
    <Header
      statusBarProps={{
        barStyle: "light-content",
        backgroundColor: color.COLORS.PRIMARY
      }}
      barStyle = {{marginVertical : "auto",alignItems:"center"}}
      leftComponent={
        <Icon
          name="bars"
          size={26}
          type="font-awesome-5"
          color={color.COLORS.WHITE}
          onPress={() => navigation.openDrawer()}
          containerStyle={{justifyContent:"center", marginTop:5, alignItems:"center", textAlignVertical:"center"}}
        />
      }
      rightComponent={
         <Avatar
        size={35}
        rounded
        containerStyle={{ justifyContent:"center", alignContent:"center", backgroundColor: color.COLORS.GREY, position: 'absolute', left: 10 }}
        onPress={() => console.log("coucou")}
        activeOpacity={0.7}
        //title={user.firstName[0] + user.lastName[0]}
        titleStyle={{textTransform : "uppercase"}}
        />

      }
      centerComponent={{ text: title, style: { color: "#fff" } }}
      containerStyle={{
        backgroundColor: color.COLORS.PRIMARY,
        //justifyContent: "space-around",
        //paddingBottom : 15,
        //paddingTop:10,
        alignItems: "center",
        justifyContent: "center",
        height : 100
      }}
    />
  );
};
