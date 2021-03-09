import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'



export const HomeScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
            onPress={() => navigation.navigate('Notifications')}
            title="Go to notifications"
            />
        </View>
    )
}


const styles = StyleSheet.create({})
