import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Formik } from "formik";
import color from "../../constants/color";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Icon, Overlay } from "react-native-elements";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { AuthContext } from "../../context/AuthContext";

export const FormHolidaysUpdate = ({ item, children }) => {
  const { token } = useContext(AuthContext);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const week = new Date(tomorrow);
  week.setDate(week.getDate() + 7);

  const [startDate, setStartDate] = useState(new Date(item.starting_date));
  const [endDate, setEndDate] = useState(new Date(item.ending_date));
  const [type, setType] = useState(item.type === "rtt" ? 0 : 1);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
  };

  const showDatepickerStart = () => {
    setShowStart(true);
  };
  const showDatepickerEnd = () => {
    setShowEnd(true);
  };

  const toggleShowConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  const updateHoliday = (holiday) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      validation_date: Date.now(),
      note: holiday.note,
      starting_date: holiday.startDate,
      ending_date: holiday.endDate,
      current_date: Date.now(),
      type: holiday.type,
    });
    console.log(raw);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(item._id);
    fetch(
      `http://${process.env.REACT_APP_API_HOST}/api/holidays/${item._id}`,
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
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "center",
          marginHorizontal: 39,
        }}
      >
        Modification de la demande
      </Text>
      <Formik
        initialValues={{
          note: item.note,
          type: item.type,
          startDate: item.startDate,
          endDate: item.endDate,
        }}
        onSubmit={(values) => {
          updateHoliday(values);
        }}
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
                toggleShowConfirm();
              }}
              title="Mettre à jour"
              color={color.COLORS.PRIMARY}
            />
          </View>
        )}
      </Formik>
      {children}
      <Overlay
        isVisible={showConfirm}
        onBackdropPress={() => {
          toggleShowConfirm();
        }}
      >
        <Icon
          name="check-circle"
          type="font-awesome-5"
          color={color.COLORS.SUCCESS}
        />
        <Text>La demande a été mise à jour ! </Text>
      </Overlay>
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