import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Overlay, Icon } from "react-native-elements";
import color from "../../constants/color";
import { screen } from "../../styles";
import { ValidateRefuseHoliday } from "./ValidateRefuseHoliday";
import { formatDisplay } from "../../function/";
import { CardHolidays } from "./CardHoliday";

export const CardHolidayRh = ({ item, refreshHolidays }) => {
  const [showValidator, setShowValidator] = useState(false);

  const toggleShowPopUp = async () => {
    await setShowValidator(!showValidator);
    if (showValidator) {
      refreshHolidays(item);
    }
  };

  const overlay = () => {
    return (
      <ValidateRefuseHoliday item={item} toggleShowPopUp={toggleShowPopUp} />
    );
  };

  const requester = () => {
    if (item.id_requester_employee.firstName) {
      return (
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.firstName}>{item.id_requester_employee.firstName}</Text>
          <Text>{item.id_requester_employee.lastName}</Text>
        </View>
      );
    }
  };

  const displayStatus = () => {
    switch (item.status) {
      case "en attente":
        return (
          <CardHolidays
            backgroundColor={color.COLORS.WAIT}
            icon={"hourglass"}
            colorIcon={color.COLORS.WHITE}
            status={item.status}
          />
        )

      case "prévalidé":
        return (
          <CardHolidays
            backgroundColor={color.COLORS.PREVALIDATE}
            icon={"play-circle"}
            colorIcon={color.COLORS.WHITE}
            status={item.status}
          />
        )

      case "validé":
        return (
          <CardHolidays
            backgroundColor={color.COLORS.VALIDATE}
            icon={"check-circle"}
            colorIcon={color.COLORS.WHITE}
            status={item.status}
          />
        )

      case "refusé":
        return (
          <CardHolidays
            backgroundColor={color.COLORS.REFUSE}
            icon={"times-circle"}
            colorIcon={color.COLORS.WHITE}
            status={item.status}
          />
        )

      case "annulé":
        return (
          <CardHolidays
            backgroundColor={color.COLORS.CANCEL}
            icon={"ban"}
            colorIcon={color.COLORS.WHITE}
            status={item.status}
          />
        )
    }
  };

  return (
    <View>
      <Pressable onPress={toggleShowPopUp}>
        <View style={styles.card}>
          {displayStatus()}
          <View style={{ flex: 4 }}>
            <Text style={{ alignSelf: "flex-end", marginRight: 5 }}>
              {formatDisplay(item.current_date)}
            </Text>
            {requester()}
            <Text style={styles.type}>{item.type}</Text>
            <View style={styles.dates}>
              <View style={{ alignSelf: "center", flex: 1 }}></View>
              <View style={{ alignSelf: "center", flex: 3 }}>
                <Icon
                  name="calendar-alt"
                  type="font-awesome-5"
                  color={color.COLORS.GREY}
                />
              </View>
              <View style={{ alignSelf: "center", flex: 1 }}></View>
              <Text style={{ alignSelf: "center", flex: 9 }}>
                {formatDisplay(item.starting_date)}
              </Text>
              <View style={{ alignSelf: "center", flex: 1 }}></View>
              <View style={{ alignSelf: "center", flex: 3 }}>
                <Icon
                  name="arrow-alt-circle-right"
                  type="font-awesome-5"
                  color={color.COLORS.GREY}
                />
              </View>
              <View style={{ alignSelf: "center", flex: 1 }}></View>
              <Text style={{ alignSelf: "center", flex: 9 }}>
                {formatDisplay(item.ending_date)}
              </Text>
              <View style={{ alignSelf: "center", flex: 1 }}></View>
            </View>
          </View>
        </View>
      </Pressable>
      <Overlay
        isVisible={showValidator}
        onBackdropPress={toggleShowPopUp}
        overlayStyle={screen.overlay}
      >
        {overlay()}
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: color.COLORS.WHITE,
    borderRadius: 10,
    borderColor: color.COLORS.GREY,
    borderWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  button: {
    borderTopColor: color.COLORS.GREY,
    borderWidth: 1,
  },
  dates: {
    marginTop: 10,
    alignContent: "flex-start",
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },

  textStatus: {
    color: color.COLORS.WHITE,
    alignSelf: "center",
    flex: 1,
    fontSize: 13,
  },
  type: {
    marginLeft: 10,
    textTransform: "capitalize",
  },
  firstName: {
    textTransform: "capitalize",
    marginRight: 5,
    marginLeft: 20,
  },
});
