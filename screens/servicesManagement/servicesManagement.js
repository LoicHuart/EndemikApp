import React from "react"
import { Text, View } from "react-native"
import { HeaderCustom, ListServices, Card, AddService } from "../../components/"
import { Button, Overlay, Input } from "react-native-elements"
import { screen } from "../../styles/"

export const servicesManagement = ({ navigation }) => {
  const [overlayAdd, setOverlayAdd] = React.useState(false);

  const toggleOverlayAdd = () => {
    setOverlayAdd(!overlayAdd);
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} title="Gestion des services" />
      <View>
        <Card>
          <Text style={screen.title}>Liste des services</Text>
          <Button
            title="Ajouter un service"
            buttonStyle={screen.button}
            onPress={toggleOverlayAdd}
          />

          <ListServices />

          <Overlay isVisible={overlayAdd} onBackdropPress={toggleOverlayAdd}>
            <AddService/>  
          </Overlay>
        </Card>
      </View>
    </View>
  );
};
