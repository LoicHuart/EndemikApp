import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Icon, Overlay } from "react-native-elements"
import color from "../../constants/color"
import { Pressable } from "react-native";
import { screen } from "../../styles/";
import { ValideRefuseService } from "./ValideRefuseService";

export const CardService = ({item, refreshService}) => {
    const [overlayDelete, setOverlayDelete] = React.useState(false);

    const toggleOverlayDelete = () => {
        setOverlayDelete(!overlayDelete);
        refreshService();
    };

    return (
        <View>
            <View style={styles.cardTop}>
                <Text style={styles.service}>{item.name}</Text>
                <Text>Manager : </Text>
                <View style={{flexDirection: "row",alignItems: "center", margin: 10}}>
                    <Avatar
                        rounded
                        source={{
                            uri: `http://${process.env.REACT_APP_API_HOST}/uploads/${item.id_manager.photo_url}`,
                        }}
                        size="medium"
                        title={item.id_manager.firstName[0] + item.id_manager.lastName[0]}
                    />
                    <Text style={styles.firstName}>{item.id_manager.firstName}</Text>
                    <Text>{item.id_manager.lastName}</Text>
                </View>
            </View>
            <View style={styles.cardBot}>
                <View style={{flexDirection: "row",alignItems: "center", flex:1}}>
                    <View style= {{flex:0.5}}>
                        <Icon
                            name='edit'
                            type='font-awesome-5'
                            color= {color.COLORS.GREY}
                        />
                    </View>
                    <Pressable 
                        style= {{flex:0.5}}
                        // onPress={() => deleteService(item._id)}
                        onPress={toggleOverlayDelete}
                    >
                        <Icon
                            name='trash'
                            type='font-awesome-5'
                            color= {color.COLORS.GREY}
                        />
                    </Pressable>
                </View>
            </View>

            <Overlay
                isVisible={overlayDelete}
                onBackdropPress={toggleOverlayDelete}
                overlayStyle={screen.overlay}
            >
                <ValideRefuseService itemId={item._id} text={"Voulez-vous supprimer ce service ?"} toggleOverlay={toggleOverlayDelete} />
          </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    cardTop: {
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: color.COLORS.LIGHTGREY,
        padding: 10,
        
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: color.COLORS.GREY,
        borderWidth: 1,

    },
    cardBot: {
        marginBottom: 10,
        marginHorizontal: 10,
        backgroundColor: color.COLORS.LIGHTGREY,
        padding: 5,
        
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: color.COLORS.GREY,
        borderWidth: 1,
        borderTopWidth: 0,

    },
    button: {
        borderTopColor: color.COLORS.GREY,
        borderWidth: 1,
    },
    firstName: {
      textTransform: "capitalize",
      marginRight: 5,
      marginLeft: 20,
    },
    service: {
      textTransform: "uppercase",
      textAlign: 'center', 
      fontWeight: "bold"
    }

})
