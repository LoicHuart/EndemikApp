import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { HeaderCustom, ListServices, Card, AddService } from "../../components/"
import { Button, Overlay, Input } from "react-native-elements"
import color from "../../constants/color"

export const servicesManagement = ({ navigation }) => {
  const [overlayAdd, setOverlayAdd] = React.useState(false)

  const toggleOverlayAdd = () => {
    setOverlayAdd(!overlayAdd);
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom navigation={navigation} title="GESTION DES SERVICES" />
      <View>
        <Card>
          <Text style={styles.title}>
            Liste des services
          </Text>
          <Button 
            title="Ajouter un service" 
            buttonStyle={styles.button}
            onPress={toggleOverlayAdd}
          />
        
          <ListServices/>

          <Overlay isVisible={overlayAdd} onBackdropPress={toggleOverlayAdd}>
            <AddService/>  
          </Overlay>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title:{
    marginBottom: 30, 
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  button:{
    backgroundColor: color.COLORS.SECONDARY,
    alignSelf: 'flex-start',
    alignSelf: 'center'
  }
});
