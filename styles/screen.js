import { StyleSheet } from 'react-native';
import color from "../constants/color";

export const screen = StyleSheet.create({
    title: {
        marginBottom: 30,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
    },
    button: {
        backgroundColor: color.COLORS.SECONDARY,
        alignSelf: "flex-start",
        alignSelf: "center",
    },
    overlay: {
        padding: 15,
        borderRadius: 10,
    }
});
