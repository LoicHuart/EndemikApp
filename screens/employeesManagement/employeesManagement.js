import React from "react";
import { Text, View, ScrollView } from "react-native";
import {
  HeaderCustom,
  ListEmployees,
  Card,
  AddEmployee,
} from "../../components/";
import { Icon, Overlay } from "react-native-elements";
import color from "../../constants/color";
import { screen } from "../../styles/screen";

export const employeesManagement = ({ navigation }) => {
  const [overlayAdd, setOverlayAdd] = React.useState(false);

  const toggleOverlayAdd = () => {
    setOverlayAdd(!overlayAdd);
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <View style={{ flex: 75 }}>
        <Card>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[screen.h2, { flex: 0.9 }]}>
              Liste des utilisateurs :
            </Text>
            <Icon
              raised
              reverse
              name="user-plus"
              size={17}
              type="font-awesome"
              color={color.COLORS.PRIMARY}
              style={{ flex: 0.1 }}
              onPress={toggleOverlayAdd}
            />
          </View>
          <ListEmployees />
          <Overlay
            overlayStyle={screen.overlay}
            isVisible={overlayAdd}
            onBackdropPress={toggleOverlayAdd}
          >
            <ScrollView>
              <AddEmployee toggleOverlayAdd={toggleOverlayAdd} />
            </ScrollView>
          </Overlay>
        </Card>
      </View>
      <View style={{ flex: 25 }}>
      </View>
    </View>
  );
};
