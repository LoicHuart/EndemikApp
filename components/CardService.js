import { blue } from '@material-ui/core/colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Icon } from "react-native-elements"
import color from "../constants/color"

export const CardService = ({item}) => {
    return (
        <View>
            <View style={styles.cardTop}>
                <Text>Service : {item.name}</Text>
                <View style={{flexDirection: "row",alignItems: "center"}}>
                    <Avatar
                        rounded
                        source={{
                            uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                        }}
                        size="medium"
                        title="test"
                    />
                    <Text>  {item.id_manager.firstName} {item.id_manager.lastName}</Text>
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
                    <View style= {{flex:0.5}}>
                        <Icon
                            name='trash'
                            type='font-awesome-5'
                            color= {color.COLORS.GREY}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardTop: {
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: color.COLORS.WHITE,
        padding: 10,
        
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: color.COLORS.GREY,
        borderWidth: 1,

    },
    cardBot: {
        marginBottom: 10,
        marginHorizontal: 10,
        backgroundColor: color.COLORS.WHITE,
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
    }

})
