import React from "react";
import { Text, View } from "react-native";
import { Icon } from "react-native-elements";
import color from "../../constants/color";

export const CardHolidays = ({ backgroundColor, icon, colorIcon, status }) => {
    return (
        <View
            style={{
                backgroundColor: backgroundColor,
                flex: 1,
                borderTopLeftRadius: 9,
                borderBottomLeftRadius: 9,
                flexDirection: "column",
            }}
        >
            <View style={{ flex: 1, marginTop: 30 }}>
                <Icon
                    name={icon}
                    type="font-awesome-5"
                    color={colorIcon}
                />
            </View>

            <Text style={{ color: color.COLORS.WHITE, alignSelf: "center", flex: 1, fontSize: 13, textTransform: 'capitalize' }}>{status}</Text>
        </View>
    );
};
