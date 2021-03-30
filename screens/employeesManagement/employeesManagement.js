import React from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import {
  HeaderCustom,
  ListEmployees,
  Card,
  AddEmployee,
} from "../../components/";
import { FontAwesome } from "@expo/vector-icons";
import { Icon, Overlay } from "react-native-elements";
import color from "../../constants/color";

export const employeesManagement = ({ navigation }) => {
  const [overlayAdd, setOverlayAdd] = React.useState(false);

  const toggleOverlayAdd = () => {
    setOverlayAdd(!overlayAdd);
  };
  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <View style={{ width: Dimensions.get("window").width - 60 }}>
        <Card>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginTop: 10,
                marginBottom: 20,
                fontWeight: "bold",
                fontSize: 17,
                flex: 0.9,
              }}
            >
              Liste des utilisateurs :
            </Text>
            {/* <FontAwesome
            name="user-plus"
            onPress={() => console.log("addUser")}
            size={15}
            style={{
              alignContent: "center",
              flex: 0.2,
            }}
          /> */}
            <Icon
              raised
              name="user-plus"
              size={17}
              type="font-awesome"
              color={color.COLORS.GREY}
              style={{
                flex: 0.1,
              }}
              onPress={toggleOverlayAdd}
            />
          </View>
          <ListEmployees />
          <Overlay isVisible={overlayAdd} onBackdropPress={toggleOverlayAdd}>
            <AddEmployee />
          </Overlay>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

{
  /* <View
style={{
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}}
>
<ListEmployees />
</View> */
}
