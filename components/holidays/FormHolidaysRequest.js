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

export const FormHolidaysRequest = () => {
  const { user, token } = useContext(AuthContext);

  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
  const [type, setType] = useState(0);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const format = (date) => {
    date = new Date(date);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  const onChangeStartDate = (selectedDate) => {
    setStartDate(new Date(selectedDate.nativeEvent.timestamp));
    setShowStart(false);
  };

  const onChangeEndDate = (selectedDate) => {
    setEndDate(new Date(selectedDate.nativeEvent.timestamp));
    setShowEnd(false);
  };

  const showDatepickerStart = () => {
    setShowStart(true);
  };
  const showDatepickerEnd = () => {
    setShowEnd(true);
  };

  const addHoliday = (holiday, user) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    console.log(holiday.starting_date);
    var raw = JSON.stringify({
      note: holiday.note,
      starting_date: holiday.starting_date,
      ending_date: holiday.ending_date,
      type: holiday.type,
      id_requester_employee: user.id,
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
      //.then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const radio_props = [
    { label: "RTT", value: 0 },
    { label: "Congé payé", value: 1 },
  ];

  return (
    <View
      style={{
        marginVertical: 50,
        marginHorizontal: 10,
        backgroundColor: color.COLORS.DEFAULT,
        padding: 10,
        marginHorizontal: 40,
        borderRadius: 15,

        flex: 5,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "center" }}>
        Nouvelle demande
      </Text>
      <Formik
        initialValues={{
          note: "",
          type: "rtt",
          startDate: startDate,
          endDate: startDate,
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
              <View>
                <View>
                  <Button
                    onPress={showDatepickerStart}
                    title={format(startDate)}
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
              <View>
                <View>
                  <Button onPress={showDatepickerEnd} title={format(endDate)} />
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

              {/* <Text style={{ fontSize: 0 }} value={values.type} />
              <Text style={{ fontSize: 0 }} value={values.startDate} />
              <Text style={{ fontSize: 0 }} value={values.endDate} /> */}
            </View>
            <Button
              onPress={handleSubmit}
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
