import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import color from "../../constants/color";

export const CardHolidayRh = ({ item }) => {
  const formatDisplay = (date) => {
    date = new Date(date);
    let day = date.getDate();
    if (day.toString().length < 2) {
      day = "0" + day;
    }

    let month = date.getMonth() + 1;
    if (month.toString().length < 2) {
      month = "0" + month;
    }

    return day + "/" + month + "/" + date.getFullYear();
  };
  return (
    <View>
      <View style={styles.card}>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Congée du {formatDisplay(item.starting_date)} au{" "}
          {formatDisplay(item.ending_date)}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ flex: 3 }}>{item.status}</Text>

          <Icon
            name="play-circle"
            type="font-awesome-5"
            color={color.COLORS.WARNING}
            onPress={() => console.log(item)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: color.COLORS.WHITE,
    padding: 10,
    borderRadius: 10,
    borderColor: color.COLORS.GREY,
    borderWidth: 1,
  },
  button: {
    borderTopColor: color.COLORS.GREY,
    borderWidth: 1,
  },
});
