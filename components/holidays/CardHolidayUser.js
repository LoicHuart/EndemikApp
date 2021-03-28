import React from "react";
import { Button } from "react-native";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Icon, Overlay } from "react-native-elements";
import color from "../../constants/color";
import { FormHolidaysUpdate } from "./FormHolidaysUpdate";

export const CardHolidayUser = ({ item }) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);

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
  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };
  const toggleShowUpdate = () => {
    if (item.status == "en attente") {
      setShowUpdate(!showUpdate);
    }
  };

  return (
    <View>
      <Pressable onPress={toggleShowDetails} onLongPress={toggleShowUpdate}>
        <View style={styles.card}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Congée du {formatDisplay(item.starting_date)} au{" "}
            {formatDisplay(item.ending_date)}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 3 }}>{item.status}</Text>
            {item.status == "en attente" && (
              <Icon
                name="question-circle"
                type="font-awesome-5"
                color={color.COLORS.GREY}
              />
            )}
            {item.status == "prevalidée" && (
              <Icon
                name="play-circle"
                type="font-awesome-5"
                color={color.COLORS.WARNING}
              />
            )}
            {item.status == "validée" && (
              <Icon
                name="check-circle"
                type="font-awesome-5"
                color={color.COLORS.SUCCESS}
              />
            )}
            {item.status == "refusée" && (
              <Icon
                name="times-circle"
                type="font-awesome-5"
                color={color.COLORS.DANGER}
              />
            )}
          </View>
          <Text style={{ flex: 3 }}>{item.type}</Text>
        </View>
      </Pressable>
      <Overlay isVisible={showDetails} onBackdropPress={toggleShowDetails}>
        <Text>
          {item.status}
          {"\n"}
          {item.note}
          {"\n"}
          {formatDisplay(item.starting_date)}
          {"\n"}
          {formatDisplay(item.ending_date)}
          {"\n"}
          {item.type}
          {"\n"}
          {formatDisplay(item.current_date)}
        </Text>
      </Overlay>
      <Overlay isVisible={showUpdate} onBackdropPress={toggleShowUpdate}>
        <FormHolidaysUpdate item={item} back={toggleShowUpdate}>
          <Button
            title="Retour"
            color={color.COLORS.PRIMARY}
            onPress={toggleShowUpdate}
          ></Button>
        </FormHolidaysUpdate>
      </Overlay>
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
