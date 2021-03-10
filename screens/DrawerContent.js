import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';

import { Icon } from 'react-native-elements'
import { dashbord } from './dashbord/dashbord';

import color from '../constants/color'
import { Drawer } from '@material-ui/core';

export function DrawerContent(props) {
    return(
        <View style={{flex:1, backgroundColor: color.COLORS.PRIMARY}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <Text style={styles.row, styles.title}>MENU</Text>
                    <DrawerItem 
                        style={styles.drawerItem}
                        icon={() => (
                            <Icon
                                name='desktop'
                                type='font-awesome-5'
                                color={color.COLORS.DEFAULT}
                            />
                        )}
                        label="Tableau de bord"
                        onPress={() => {props.navigation.navigate('dashbord')}}
                        labelStyle={styles.labelStyle}
                    />
                    <DrawerItem 
                        style={styles.drawerItem}
                        icon={() => (
                            <Icon
                                name='calendar-plus'
                                type='font-awesome-5'
                                color={color.COLORS.DEFAULT}
                            />
                        )}
                        label="Demande de congé"
                        onPress={() => {props.navigation.navigate('holidaysRequest')}}
                        labelStyle={styles.labelStyle}
                    />
                    <DrawerItem 
                        style={styles.drawerItem}
                        icon={() => (
                            <Icon
                                name='calendar-day'
                                type='font-awesome-5'
                                color={color.COLORS.DEFAULT}
                            />
                        )}
                        label="Gestion des congés"
                        onPress={() => {props.navigation.navigate('holidaysManagement')}}
                        labelStyle={styles.labelStyle}
                    />
                    <DrawerItem 
                        style={styles.drawerItem}
                        icon={() => (
                            <Icon
                                name='users-cog'
                                type='font-awesome-5'
                                color={color.COLORS.DEFAULT}
                            />
                        )}
                        label="Gestion des utilisateurs"
                        onPress={() => {props.navigation.navigate('usersManagement')}}
                        labelStyle={styles.labelStyle}
                    />
                    <DrawerItem 
                        style={styles.drawerItem}
                        icon={() => (
                            <Icon
                                name='user'
                                type='font-awesome-5'
                                color={color.COLORS.DEFAULT}
                            />
                        )}
                        label="Mon profil"
                        onPress={() => {props.navigation.navigate('profil')}}
                        labelStyle={styles.labelStyle}
                    />
                    <DrawerItem 
                        style={styles.drawerItem}
                        icon={() => (
                            <Icon
                                name='sc-telegram'
                                type='evilicon'
                                color={color.COLORS.DEFAULT}
                            />
                        )}
                        label="Login"
                        onPress={() => {props.navigation.navigate('login')}}
                        labelStyle={styles.labelStyle}
                    />
                </View>
            </DrawerContentScrollView>
    
        </View>
    )
}

const styles = StyleSheet.create({
    drawerItem: {
        paddingHorizontal: 25,
    },
    drawerContent: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginTop: 3,
        fontWeight: 'bold',
        textAlign: 'center',
        color:color.COLORS.DEFAULT,
        marginBottom: 20
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelStyle: {
        fontWeight: 'bold',
        color:color.COLORS.DEFAULT,
    },
  });