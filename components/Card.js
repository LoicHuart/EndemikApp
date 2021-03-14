import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import color from "../constants/color";

export const Card = ({children}) => {
    return (
        <View style={styles.card}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: color.COLORS.DEFAULT,
        padding: 40,
        
        borderRadius: 15,

      }

})
