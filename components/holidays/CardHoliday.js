import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Overlay, Icon } from "react-native-elements";
import color from "../../constants/color";
import { ValidateRefuseHoliday } from "./ValidateRefuseHoliday";
import { screen } from "../../styles";
import { UpdateHoliday } from "./UpdateHoliday";
import { CancelHoliday } from "./CancelHoliday";
import { date } from "yup/lib/locale";

export const CardHoliday = ({ item, gestion, refreshHolidays }) => {
  const [showValidator, setShowValidator] = useState(false);

  const capitalize = (str) => {
    if (str.toUpperCase() === "RTT") {
      return "RTT";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const displayStatus = () => {
    switch (item.status) {
      case "en attente":
        return (
          <View
            style={{
              backgroundColor: color.COLORS.WAIT,
              flex: 1,
              borderTopLeftRadius: 9,
              borderBottomLeftRadius: 9,
              flexDirection: "column",
            }}
          >
            <View style={{ flex: 1, marginTop: 30 }}>
              <Icon
                name="hourglass"
                type="font-awesome-5"
                color={color.COLORS.WHITE}
              />
            </View>

            <Text style={styles.textStatus}>{capitalize(item.status)}</Text>
          </View>
        );

      case "prévalidé":
        return (
          <View
            style={{
              backgroundColor: color.COLORS.PREVALIDATE,
              flex: 1,
              borderTopLeftRadius: 9,
              borderBottomLeftRadius: 9,
            }}
          >
            <View style={{ flex: 1, marginTop: 30 }}>
              <Icon
                name="play-circle"
                type="font-awesome-5"
                color={color.COLORS.WHITE}
              />
            </View>
            <Text style={styles.textStatus}>{capitalize(item.status)}</Text>
          </View>
        );

      case "validé":
        return (
          <View
            style={{
              backgroundColor: color.COLORS.VALIDATE,
              flex: 1,
              borderTopLeftRadius: 9,
              borderBottomLeftRadius: 9,
            }}
          >
            <View style={{ flex: 1, marginTop: 30 }}>
              <Icon
                name="check-circle"
                type="font-awesome-5"
                color={color.COLORS.WHITE}
              />
            </View>
            <Text style={styles.textStatus}>{capitalize(item.status)}</Text>
          </View>
        );

      case "refusé":
        return (
          <View
            style={{
              backgroundColor: color.COLORS.REFUSE,
              flex: 1,
              borderTopLeftRadius: 9,
              borderBottomLeftRadius: 9,
            }}
          >
            <View style={{ flex: 1, marginTop: 30 }}>
              <Icon
                name="times-circle"
                type="font-awesome-5"
                color={color.COLORS.WHITE}
              />
            </View>
            <Text style={styles.textStatus}>{capitalize(item.status)}</Text>
          </View>
        );
      case "annulé":
        return (
          <View
            style={{
              backgroundColor: color.COLORS.CANCEL,
              flex: 1,
              borderTopLeftRadius: 9,
              borderBottomLeftRadius: 9,
              flexDirection: "column",
            }}
          >
            <View style={{ flex: 1, marginTop: 30 }}>
              <Icon
                name="ban"
                type="font-awesome-5"
                color={color.COLORS.WHITE}
              />
            </View>
            <Text style={styles.textStatus}>{capitalize(item.status)}</Text>
          </View>
        );
    }
  };

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
    z;
  };
  const toggleShowPopUp = async () => {
    await setShowValidator(!showValidator);
    if (
      (item.status === "en attente" ||
        item.status === "prévalidé" ||
        item.status === "validé") &&
      showValidator
    ) {
      refreshHolidays(item.status);
    }
  };

  const overlay = () => {
    if (gestion) {
      return (
        <ValidateRefuseHoliday item={item} toggleShowPopUp={toggleShowPopUp} />
      );
    } else {
      if (item.status === "en attente") {
        return <UpdateHoliday item={item} toggleShowPopUp={toggleShowPopUp} />;
      } else {
        if (
          (item.status === "prévalidé" || item.status === "validé") &&
          Date.now() < new Date(item.starting_date)
        ) {
          return (
            <CancelHoliday item={item} toggleShowPopUp={toggleShowPopUp} />
          );
        }
        return (
          <View>
            <Text>{capitalize(item.status)}</Text>
            <Text>{capitalize(item.type)}</Text>
            <Text>{item.note}</Text>
            <Text>{formatDisplay(item.starting_date)}</Text>
            <Text>{formatDisplay(item.ending_date)}</Text>
          </View>
        );
      }
    }
  };
  const requester = () => {
    if (item.id_requester_employee.firstName) {
      return (
        <Text style={styles.type}>
          {item.id_requester_employee.firstName}{" "}
          {item.id_requester_employee.lastName}{" "}
        </Text>
      );
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
            <Text style={styles.type}>{capitalize(item.type)}</Text>
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
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },

  textStatus: {
    color: color.COLORS.WHITE,
    alignSelf: "center",
    flex: 1,
  },
  type: {
    marginLeft: 10,
  },
});
