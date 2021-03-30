import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Icon } from "react-native-elements"
import color from "../../constants/color"
import { AuthContext } from "../../context/AuthContext"
import { Pressable } from "react-native";
export const CardService = ({item}) => {
    const { token } = useContext(AuthContext);

    const deleteService = async (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://${process.env.REACT_APP_API_HOST}/api/services/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
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
                        onPress={() => deleteService(item._id)}
                    >
                        <Icon
                            name='trash'
                            type='font-awesome-5'
                            color= {color.COLORS.GREY}
                        />
                    </Pressable>
                </View>
            </View>
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
