import React, { useState } from "react";
import { View, Platform, Text } from "react-native";
import { Pressable } from "react-native";
import { Input } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDisplay } from "../function";
import { screen } from "../styles/screen";

export const DatePicker = ({ onChange, value, errorMessage }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChangeDate = (selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate.type !== "dismissed") {
            let timestamp = new Date(selectedDate.nativeEvent.timestamp);
            onChange(timestamp);
        }
    };

    const handleShowDatepicker = () => {
        setShowDatePicker(true);
    };

    return (
        <View>
            {(Platform.OS === "ios") ?
                <View >
                    <View style={{ justifyContent: "center", marginVertical: 3 }}>
                        <DateTimePicker
                            testID="dateTimePickerDateBirth"
                            value={value}
                            locale="fr-FR"
                            mode="date"
                            display="default"
                            onChange={(item) =>
                                onChangeDate(item)
                            }
                        />
                    </View>
                    <Text style={{ color: '#ff190c', fontSize: 12, margin: 5 }}>{errorMessage}</Text>
                </View>
                :
                <View >
                    <Pressable onPress={handleShowDatepicker}>
                        <Input
                            style={screen.input}
                            value={value && formatDisplay(value)}
                            placeholder="Date de naissance"
                            errorMessage={errorMessage}
                            disabled
                        />
                    </Pressable>
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePickerDateBirth"
                            value={value}
                            locale="fr-FR"
                            mode="date"
                            display="default"
                            onChange={(item) =>
                                onChangeDate(item)
                            }
                        />
                    )}
                </View>
            }
        </View>
    );
};
