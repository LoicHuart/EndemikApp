import React from "react";
import { Text, View } from "react-native";
import {
  HeaderCustom,
  ListServices,
  Card,
  AddService,
} from "../../components/";
import { Overlay, Icon } from "react-native-elements";
import { screen } from "../../styles/";
import color from "../../constants/color";

export const servicesManagement = ({ navigation }) => {
  const [overlayAdd, setOverlayAdd] = React.useState(false);
  const [refreshService, setRefreshService] = React.useState(false);

  const toggleOverlayAdd = () => {
    setOverlayAdd(!overlayAdd);
    setRefreshService(!refreshService);
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} />
      <View style={{ flex: 75 }}>
        <Card>
          <View style={{ flexDirection: "row", alignItems: "center", }} >
            <Text style={[screen.h2, { flex: 0.9 }]} >
              Liste des services :
            </Text>
            <Icon
              raised
              reverse
              name="plus"
              size={17}
              type="font-awesome"
              color={color.COLORS.PRIMARY}
              onPress={toggleOverlayAdd}
            />
          </View>

          <ListServices refresh={refreshService} />

          <Overlay
            isVisible={overlayAdd}
            onBackdropPress={toggleOverlayAdd}
            overlayStyle={screen.overlay}
          >
            <AddService toggleOverlayAdd={toggleOverlayAdd} />
          </Overlay>
        </Card>
      </View>
      <View style={{ flex: 25 }}>
      </View>
    </View>
  );
};
