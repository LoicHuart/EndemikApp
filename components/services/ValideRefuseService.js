import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native'
import { Button } from "react-native-elements";
import color from "../../constants/color";
import { screen } from "../../styles";
import { AuthContext } from "../../context/AuthContext";

export const ValideRefuseService = ({itemId, text, toggleOverlay}) => {
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = React.useState(true);
    const [resultDeleteService, setResultDeleteService] = React.useState([]);

    const deleteService = async (id) => {
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch(`http://${process.env.REACT_APP_API_HOST}/api/services/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setResultDeleteService(result);
            })
            .catch(error => console.log('error', error));
    };

    useEffect(() => {
        setLoading(false);
    }, [resultDeleteService]);
    
    useEffect(() => {
        // console.log(loading)
        // console.log(resultDeleteService)
        if (resultDeleteService.message && !resultDeleteService.error && !loading) {
            toggleOverlay()
        }
    }, [loading]);

    return (
        <View>
            <Text style={screen.title}>{text}</Text>
            {resultDeleteService.error && (
                <Text style={{color: color.COLORS.DANGER, alignSelf:"center"}}>Vous ne pouvez pas supprimer ce service</Text>
            )}
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                <Button
                    buttonStyle={screen.buttonCancel}
                    title="Annuler"
                    onPress={() => toggleOverlay()}
                />
                </View>
                <View style={{ flex: 1 }}>
                <Button
                    buttonStyle={screen.button}
                    onPress={() => deleteService(itemId)}
                    title="Valider"
                />
                </View>
            </View>
        </View>
    );
};
