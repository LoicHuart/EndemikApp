import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Formik } from "formik";
import color from "../../constants/color";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Icon, Button, Input } from "react-native-elements";
import { screen } from "../../styles";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { AuthContext } from "../../context/AuthContext";
import { ConfirmAddHoliday } from "./ConfirmAddHoliday";
import { Card } from "../Card";
import { addHolidayApi } from "../../requestApi";
import { formatAPI, formatDisplay } from "../../function/";

export const AddHoliday = () => {
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
  const [loading, setLoading] = useState(true);
  const [resultAddHoliday, setResultAddHoliday] = useState("");

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

  const addHoliday = async (holiday) => {
    if (!loading) {
      setLoading(true);
      await addHolidayApi(holiday, token, user).then((result) => {
        setResultAddHoliday(result);
      });
    } else {
      console.log("Loading");
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [resultAddHoliday]);

  useEffect(() => {
    if (resultAddHoliday._id && !loading) {
      setShowConfirm(true);
    }
  }, [loading]);

  const radio_props = [
    { label: "RTT", value: 0, name: "rtt" },
    { label: "Cong??s pay??s", value: 1, name: "cong??s pay??s" },
  ];

  return (
    <>
      <Card>
        <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "center" }}>
          Nouvelle demande
        </Text>
        <Formik
          initialValues={{
            note: "Demande de cong??",
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
                          // console.log(values.type);
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
                          // console.log(values.type);
                        }}
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        labelStyle={{ fontSize: 15, color: color.COLORS.BLACK }}
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
                      locale="fr-FR"
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
                }}
                title="Valider"
                buttonStyle={loading ? "" : screen.button}
                loading={loading ? true : false}
                type={loading ? "clear" : "solid"}
              />
            </View>
          )}
        </Formik>
      </Card>
      {
        showConfirm &&
        <Pressable
          onPress={() => setShowConfirm(false)}
          style={{ opacity: showConfirm ? 100 : 0 }}
        >
          <Card>
            <ConfirmAddHoliday />
          </Card>
        </Pressable>
      }
    </>
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
