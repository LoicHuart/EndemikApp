import React, { useContext, useEffect } from "react";
import { Header, Icon, Avatar, Tooltip, Text, Button, ButtonGroup } from "react-native-elements";
import { View, Pressable } from "react-native";
import { AuthContext } from "../context/AuthContext";
import color from "../constants/color";
import { screen } from "../styles/screen";

export const HeaderCustom = ({ navigation, title }) => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <Header
      statusBarProps={{
        barStyle: "light-content",
        backgroundColor: color.COLORS.PRIMARY,
      }}

      leftComponent={
        <View style={{ alignContent: "center", justifyContent: "center", flex: 1 }}>
          <Icon
            name="bars"
            type="font-awesome-5"
            size={35}
            color={color.COLORS.WHITE}
            onPress={() => navigation.openDrawer()}
          />
        </View>
      }

      centerComponent={{ text: title, style: { color: "#fff" } }}

      rightComponent={
        <View style={{ flexDirection: "row", position: "relative", left: -15 }}>
          <Icon
            name='bell'
            type='font-awesome-5'
            color={"#ffffff"}
            containerStyle={{ flex: 0.5, justifyContent: "center", paddingRight: 15 }}
            solid
            size={30}
          />
          <View style={{ flex: 0.5 }}>
            <Tooltip
              activeOpacity={10}
              overlayColor='rgba(0, 0, 0, 0.50)'
              backgroundColor={color.COLORS.LIGHTGREY}
              containerStyle={{ height: 100, padding: 0, margin: 0 }}
              popover={
                <View style={{ padding: 0, margin: 0, height: 100 }}>
                  <Pressable style={{ flex: 1, justifyContent: "center", borderBottomWidth: 2, width: 150 }} onPress={() => navigation.navigate("profil")}>
                    <Text style={screen.h1} > Mon profil</Text>
                  </Pressable>
                  <Pressable style={{ flex: 1, justifyContent: "center", width: 150 }} onPress={signOut}>
                    <Text style={screen.h1}>Se déconnecter</Text>
                  </Pressable>

                  {/* <Button
                    title="Annuler"
                    // onPress={() => toggleOverlayEdit()}
                    buttonStyle={screen.buttonCancel}
                  /> */}
                </View>
              }

            >
              <Avatar
                size={40}
                rounded
                containerStyle={{ backgroundColor: color.COLORS.GREY }}
                activeOpacity={0.7}
                title={user.firstName[0] + user.lastName[0]}
                titleStyle={{ textTransform: "uppercase" }}
                source={{
                  uri: `http://${process.env.REACT_APP_API_HOST}/uploads/${user.photo_url}`,
                }}
              />
            </Tooltip>
          </View>
        </View >
      }

      containerStyle={{
        backgroundColor: color.COLORS.PRIMARY,
        justifyContent: "space-around",
        paddingTop: 6,
        paddingBottom: 6
      }}
    />
  );
};
