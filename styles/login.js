import { StyleSheet } from 'react-native';
import color from "../constants/color";

export const login = StyleSheet.create({
    input: {
        borderColor: "lightgray",
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderWidth: 2,
        borderStyle: "solid",
        marginVertical: 5,
        backgroundColor: color.COLORS.WHITE,
    },
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
        flex: 2,
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
        borderRadius: 30,
    },
});