import React from "react";
import { Text, View } from "react-native";
import { Icon } from "react-native-elements";
import color from "../../constants/color";


const Card = ({ backgroundColor, icon, colorIcon, status }) => {
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
    )
};



export const CardHolidays = ({ status }) => {
    switch (status) {
        case "en attente":
            return (
                <Card
                    backgroundColor={color.COLORS.WAIT}
                    icon={"hourglass"}
                    colorIcon={color.COLORS.WHITE}
                    status={status}
                />
            )

        case "prévalidé":
            return (
                <Card
                    backgroundColor={color.COLORS.PREVALIDATE}
                    icon={"play-circle"}
                    colorIcon={color.COLORS.WHITE}
                    status={status}
                />
            )

        case "validé":
            return (
                <Card
                    backgroundColor={color.COLORS.VALIDATE}
                    icon={"check-circle"}
                    colorIcon={color.COLORS.WHITE}
                    status={status}
                />
            )

        case "refusé":
            return (
                <Card
                    backgroundColor={color.COLORS.REFUSE}
                    icon={"times-circle"}
                    colorIcon={color.COLORS.WHITE}
                    status={status}
                />
            )

        case "annulé":
            return (
                <Card
                    backgroundColor={color.COLORS.CANCEL}
                    icon={"ban"}
                    colorIcon={color.COLORS.WHITE}
                    status={status}
                />
            )
    }
};
