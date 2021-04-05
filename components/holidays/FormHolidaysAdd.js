import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Formik } from "formik";
import color from "../../constants/color";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Icon, Button, Input, Overlay } from "react-native-elements";
import { screen } from "../../styles";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { AuthContext } from "../../context/AuthContext";
import { PopUpConfirm } from "./PopUpConfirm";

export const FormHolidaysAdd = () => {
  const { user, token } = useContext(AuthContext);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [startDate, setStartDate] = useState(tomorrow);
  const [endDate, setEndDate] = useState(tomorrow);
  const [type, setType] = useState(0);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleShowPopUp = () => {
    setShowConfirm(!showConfirm);
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
  };
  const formatAPI = (date) => {
    date = new Date(date);
    let day = date.getDate();
    if (day.toString().length < 2) {
      day = "0" + day;
    }
    let month = date.getMonth() + 1;
    if (month.toString().length < 2) {
      month = "0" + month;
    }
    return date.getFullYear() + "-" + month + "-" + day;
  };

  const onChangeStartDate = (selectedDate) => {
    setShowStart(false);
    if (selectedDate.type !== "dismissed") {
      let timestamp = new Date(selectedDate.nativeEvent.timestamp);
      setStartDate(timestamp);
    }
  };

  const onChangeEndDate = (selectedDate) => {
    setShowEnd(false);
    if (selectedDate.type !== "dismissed") {
      let timestamp = new Date(selectedDate.nativeEvent.timestamp);
      setEndDate(timestamp);
    }
  };

  const showDatepickerStart = () => {
    setShowStart(true);
  };
  const showDatepickerEnd = () => {
    setShowEnd(true);
  };

  const addHoliday = (holiday) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      note: holiday.note,
      starting_date: holiday.startDate,
      ending_date: holiday.endDate,
      type: holiday.type,
      id_requester_employee: user._id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    //console.log(requestOptions);
    fetch(
      `http://${process.env.REACT_APP_API_HOST}/api/holidays`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const radio_props = [
    { label: "RTT", value: 0, name: "rtt" },
    { label: "Congés payés", value: 1, name: "congés payés" },
  ];

  return (
    <View
      style={{
        marginVertical: 20,
        backgroundColor: color.COLORS.DEFAULT,
        padding: 10,
        marginHorizontal: 40,
        borderRadius: 15,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "center" }}>
        Nouvelle demande
      </Text>
      <Formik
        initialValues={{
          note: "Demande de congés",
          type: "rtt",
          startDate: startDate,
          endDate: endDate,
        }}
        onSubmit={(values) => addHoliday(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View style={styles.row}>
              <RadioForm formHorizontal={true} animation={true}>
                {/* To create radio buttons, loop through your array of options */}
                {radio_props.map((obj, i) => (
                  <RadioButton labelHorizontal={true} key={i}>
                    {/*  You can set RadioButtonLabel before RadioButtonInput */}
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      onPress={(value) => {
                        setType(value);
                        values.type = radio_props[value].name;
                        console.log(values.type);
                      }}
                      isSelected={type === i}
                      borderWidth={1}
                      buttonInnerColor={color.COLORS.PRIMARY}
                      buttonOuterColor={
                        type === i ? color.COLORS.PRIMARY : color.COLORS.GREY
                      }
                      buttonSize={15}
                      buttonOuterSize={23}
                      buttonWrapStyle={{ marginLeft: 10 }}
                    />
                    <RadioButtonLabel
                      onPress={(value) => {
                        setType(value);
                        values.type = radio_props[value].name;
                        console.log(values.type);
                      }}
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      labelStyle={{ fontSize: 15, color: color.COLORS.BLACK }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                ))}
              </RadioForm>
            </View>

            <Text>Note</Text>
            <Input
              style={styles.input}
              onChangeText={handleChange("note")}
              onBlur={handleBlur("note")}
              value={values.note}
            />
            <View style={styles.row}>
              <View style={{ flex: 1, marginTop: 4 }}>
                <Icon
                  name="calendar-alt"
                  type="font-awesome-5"
                  color={color.COLORS.PRIMARY}
                />
              </View>
              <View style={{ flex: 2, marginHorizontal: 6 }}>
                <View>
                  <Pressable onPress={showDatepickerStart}>
                    <Text style={styles.inputDate}>
                      {formatDisplay(startDate)}
                    </Text>
                  </Pressable>
                </View>
                {showStart && (
                  <DateTimePicker
                    testID="dateTimePickerStart"
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={onChangeStartDate}
                    minimumDate={tomorrow}
                  />
                )}
              </View>
              <View style={{ flex: 0.5, marginTop: 4 }}>
                <Icon
                  name="arrow-alt-circle-right"
                  type="font-awesome-5"
                  color={color.COLORS.GREY}
                />
              </View>
              <View style={{ flex: 2, marginHorizontal: 6 }}>
                <View>
                  <Pressable onPress={showDatepickerEnd}>
                    <Text style={styles.inputDate}>
                      {formatDisplay(endDate)}
                    </Text>
                  </Pressable>
                </View>
                {showEnd && (
                  <DateTimePicker
                    testID="dateTimePickerEnd"
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={onChangeEndDate}
                    minimumDate={tomorrow}
                  />
                )}
              </View>
            </View>
            <Button
              onPress={async () => {
                values.endDate = await formatAPI(endDate);
                values.startDate = await formatAPI(startDate);
                handleSubmit();
                toggleShowPopUp();
              }}
              title="Valider"
              buttonStyle={{ backgroundColor: color.COLORS.PRIMARY }}
            />
          </View>
        )}
      </Formik>
      <Overlay
        isVisible={showConfirm}
        onBackdropPress={toggleShowPopUp}
        overlayStyle={screen.overlay}
      >
        <Pressable onPress={toggleShowPopUp}>
          <PopUpConfirm />
        </Pressable>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  inputDate: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    borderStyle: "solid",
    alignSelf: "center",
    marginTop: 7,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    marginBottom: 20,
    alignSelf: "center",
  },
});
