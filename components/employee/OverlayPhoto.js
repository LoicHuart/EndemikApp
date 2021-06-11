import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { View, Platform } from "react-native";
import color from "../../constants/color";
import { ListItem, Overlay } from "react-native-elements";
import { Pressable } from "react-native";

export const OverlayPhoto = ({ toggleOverlay, visible, setImage }) => {
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            setImage(result);
        }
        toggleOverlay()
    };

    const pickImage2 = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            setImage(result);
        }
        toggleOverlay()
    };

    return (
        <Overlay isVisible={visible} fullScreen overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: 0 }}>
            <Pressable style={{ flex: 3 }} onPress={() => toggleOverlay()}>
            </Pressable>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <ListItem containerStyle={{ width: Dimensions.get("window").width }} onPress={pickImage}>
                    <ListItem.Content>
                        <ListItem.Title >{'Prendre une photo'}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem containerStyle={{ width: Dimensions.get("window").width }} onPress={pickImage2}>
                    <ListItem.Content>
                        <ListItem.Title >{'Choisir une photo'}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem containerStyle={{ backgroundColor: color.COLORS.GREY, width: Dimensions.get("window").width }} onPress={toggleOverlay}>
                    <ListItem.Content>
                        <ListItem.Title style={{ color: 'white' }}>{'Annuler'}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </View>
        </Overlay>

    );
};
