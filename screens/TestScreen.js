import React from 'react';
import { StyleSheet, View } from 'react-native'
import { Block, Text, Button as GaButton, theme } from "galio-framework";

import { Button, Select, Icon, Input, Header, Switch, Drawer} from "../components/";
import { Images, articles, argonTheme } from "../constants";


export const TestScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Header
                search
            
                title="Title"
        
                
            />


            <Button onPress={() => navigation.goBack()}>Go back home</Button>

            <Select
                defaultIndex={1}
                options={[1, 2, 3, 4, 5]}
                style={styles.shadow}
            />

           
            <Select
                defaultIndex={1}
                options={["01", "02", "03", "04", "05"]}
            />

            
            <Input
            right
            placeholder="Icon Right"
            iconContent={
                <Icon
                size={11}
                color={argonTheme.COLORS.ICON}
                name="search-zoom-in"
                family="ArgonExtra"
                />
            }
            />



          
           
        </View>
    )
}


const styles = StyleSheet.create({});
