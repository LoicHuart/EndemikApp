import React from "react";
import { Text, View } from "react-native";
import {
  HeaderCustom,
  ListServices,
  Card,
  AddService,
} from "../../components/";
import { Button, Overlay, Input, Icon } from "react-native-elements";
import { screen } from "../../styles/";
import color from "../../constants/color";

export const servicesManagement = ({ navigation }) => {
  const [overlayAdd, setOverlayAdd] = React.useState(false);

  const toggleOverlayAdd = () => {
    setOverlayAdd(!overlayAdd);
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <View>
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
              Liste des services :
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
              name="plus"
              size={17}
              type="font-awesome"
              color={color.COLORS.GREY}
              style={{
                flex: 0.1,
              }}
              onPress={toggleOverlayAdd}
            />
          </View>

          <ListServices />

          <Overlay
            isVisible={overlayAdd}
            onBackdropPress={toggleOverlayAdd}
            overlayStyle={screen.overlay}
          >
            <AddService toggleOverlayAdd={toggleOverlayAdd} />
          </Overlay>
        </Card>
      </View>
    </View>
  );
};
