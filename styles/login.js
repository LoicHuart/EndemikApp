import { StyleSheet } from 'react-native';
import color from "../constants/color";
import { Dimensions } from "react-native";

export const login = StyleSheet.create({
    form: {
        marginVertical: 50,
        marginHorizontal: 10,
        backgroundColor: color.COLORS.DEFAULT,
        padding: 40,
        marginHorizontal: 40,
        borderRadius: 15,
        flex: 5,
    },
    title: {
        textAlign: "center",
        color: color.COLORS.WHITE,
        fontSize: 30,
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        flexDirection: "column",
    },
    button: {
        backgroundColor: color.COLORS.PRIMARY,
        alignSelf: "flex-start",
        alignSelf: "center",
    },
    card: {
        alignSelf: "flex-start",
        alignSelf: "center",
        marginVertical: 10,
        marginHorizontal: 10,
        marginTop: 15,
        backgroundColor: "#F5F5F5",
        width: Dimensions.get("window").width - 70,
        borderRadius: 15,
        padding: 15,
    },
    
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    mdp:{
        marginTop:20,
        fontSize:12
    }
});