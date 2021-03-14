import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Formik } from "formik";
import color from "../constants/color";
import DatePicker from "react-native-datepicker";
import { Icon } from "react-native-elements";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

export const FormHolidaysRequest = () => {
  const [startDate, setStartDate] = useState("16-02-2000");
  const [endDate, setEndDate] = useState("16-02-2000");
  const [type, setType] = useState(0);

  var radio_props = [
    { label: "RTT", value: 0 },
    { label: "Congé Payé", value: 1 },
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
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>DEMANDE DE CONGÉ</Text>
      <Formik
        initialValues={{
          note: "",
          type: "rtt",
          startDate: startDate,
          endDate: startDate,
        }}
        onSubmit={(values) => console.log(values)}
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
              <DatePicker
                style={{ flex: 5 }}
                date={startDate} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    //display: 'none',
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 40,
                  },
                }}
                onDateChange={(startDate) => {
                  setStartDate(startDate);
                  values.startDate = startDate;
                }}
              />
              <Icon
                name="arrow-right"
                type="font-awesome-5"
                color={color.COLORS.GREY}
                style={{
                  alignSelf: "center",
                  flex: 1,
                  marginLeft: 15,
                  marginTop: 5,
                }}
              />

              <DatePicker
                style={{ flex: 5 }}
                date={endDate} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    display: "none",
                  },
                  dateInput: {
                    marginLeft: 15,
                    marginRight: 10,
                  },
                }}
                onDateChange={(endDate) => {
                  setEndDate(endDate);
                  values.endDate = endDate;
                }}
              />
              <Text style={{ fontSize: 0 }} value={values.type} />
              <Text style={{ fontSize: 0 }} value={values.startDate} />
              <Text style={{ fontSize: 0 }} value={values.endDate} />
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
