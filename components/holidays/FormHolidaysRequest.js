import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Formik } from "formik";
import color from "../../constants/color";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Icon } from "react-native-elements";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { AuthContext } from "../../context/AuthContext";
import { onChange } from "react-native-reanimated";

export const FormHolidaysRequest = () => {
  const { user, token } = useContext(AuthContext);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const week = new Date(tomorrow);
  week.setDate(week.getDate() + 7);

  const [startDate, setStartDate] = useState(tomorrow);
  const [endDate, setEndDate] = useState(week);
  const [type, setType] = useState(0);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

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
    let timestamp = new Date(selectedDate.nativeEvent.timestamp);
    console.log(timestamp);
    setStartDate(timestamp);
  };

  const onChangeEndDate = (selectedDate) => {
    setShowEnd(false);
    let timestamp = new Date(selectedDate.nativeEvent.timestamp);
    console.log(timestamp);
    setEndDate(timestamp);
    // return `${timestamp.getFullYear()}-${
    //   timestamp.getMonth() + 1
    // }-${timestamp.getDate()}`;
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
      id_requester_employee: "60525e4ad4679e76a88a43c1",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(requestOptions);
    fetch(
      `http://${process.env.REACT_APP_API_HOST}/api/holidays`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const radio_props = [
    { label: "RTT", value: 0 },
    { label: "Congé payé", value: 1 },
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
          note: "Demande de congées",
          type: "rtt",
          startDate: startDate,
          endDate: endDate,
        }}
        onSubmit={(values, user) => addHoliday(values, user)}
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
                        radio_props[0].value === value
                          ? (values.type = radio_props[0].label)
                          : (values.type = radio_props[1].label);
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
                        radio_props[0].value === value
                          ? (values.type = radio_props[0].label)
                          : (values.type = radio_props[1].label);
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
            <TextInput
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
                  color={color.COLORS.GREY}
                />
              </View>
              <View style={{ flex: 2, marginHorizontal: 6 }}>
                <View>
                  <Button
                    onPress={showDatepickerStart}
                    title={formatDisplay(startDate)}
                    color={color.COLORS.PRIMARY}
                  />
                </View>
                {showStart && (
                  <DateTimePicker
                    testID="dateTimePickerStart"
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={onChangeStartDate}
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
                  <Button
                    onPress={showDatepickerEnd}
                    title={formatDisplay(endDate)}
                    color={color.COLORS.PRIMARY}
                  />
                </View>
                {showEnd && (
                  <DateTimePicker
                    testID="dateTimePickerEnd"
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={onChangeEndDate}
                  />
                )}
              </View>
            </View>
            <Button
              onPress={async () => {
                values.endDate = await formatAPI(endDate);
                values.startDate = await formatAPI(startDate);
                handleSubmit();
              }}
              title="Submit"
              color={color.COLORS.PRIMARY}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "lightgray",
    paddingHorizontal: 5,
    borderWidth: 2,
    borderStyle: "solid",
    marginVertical: 5,
    backgroundColor: color.COLORS.WHITE,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    marginBottom: 20,
    alignSelf: "center",
  },
});
