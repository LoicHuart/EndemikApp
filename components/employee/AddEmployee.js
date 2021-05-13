import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import color from "../../constants/color";
import { Button, Input } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { Dimensions } from "react-native";
import { screen } from "../../styles/screen";
import DropDownPicker from "react-native-dropdown-picker";
import { formatDisplay } from "../../function";
import { formatAPI } from "../../function";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addEmployeeApi } from "../../requestApi";

const AddEmployeeSchema = Yup.object().shape({
  title: Yup.string().required("Champ obligatoire"),
  firstname: Yup.string()
    .min(2, "2 caractères minimum")
    .max(50, "50 caractères maximum")
    .required("Champ obligatoire"),
  lastname: Yup.string()
    .min(2, "2 caractères minimum")
    .max(50, "50 caractères maximum")
    .required("Champ obligatoire"),
  mail: Yup.string()
    .email()
    .min(2, "2 caractères minimum")
    .max(50, "50 caractères maximum")
    .required("Champ obligatoire"),
  tel: Yup.string()
    .min(10, "10 caractères")
    .max(10, "10 caractères")
    .required("Champ obligatoire"),
  date_birth: Yup.string().required("Champ obligatoire"),
  social_security_nb: Yup.string()
    .min(13, "13 caractères")
    .max(13, "13 caractères")
    .required("Champ obligatoire"),
  street_nb: Yup.string()
    .min(0, "")
    .max(10, "10 caractères maximum")
    .required("Champ obligatoire"),
  street: Yup.string()
    .min(0, "")
    .max(250, "250 caractères maximum")
    .required("Champ obligatoire"),
  postal_code: Yup.string()
    .min(0, "")
    .max(5, "5 caractères maximum")
    .required("Champ obligatoire"),
  city: Yup.string()
    .min(0, "")
    .max(250, "250 caractères maximum")
    .required("Champ obligatoire"),
  id_role: Yup.string().required("Champ obligatoire"),
  id_service: Yup.string().required("Champ obligatoire"),
  arrival_date: Yup.string().required("Champ onligatoire"),
});

export const AddEmployee = ({ toggleOverlayAdd }) => {
  const { token } = useContext(AuthContext);
  const [resultAddEmployee, setResultAddEmployee] = React.useState("");
  const [resultGetServices, setResultGetServices] = React.useState([]);
  const [heightDropdown, setHeightDropdown] = React.useState(40);
  const [heightDropdownRole, setHeightDropdownRole] = React.useState(40);
  const [heightDropdownTitle, setHeightDropdownTitle] = React.useState(40);
  const [heightDropdownService, setHeightDropdownService] = React.useState(40);
  const [loading, setLoading] = React.useState(true);

  const today = new Date();
  const [birthDate, setbirthDate] = useState();
  const [showBirth, setShowBirth] = useState(false);
  const [showArrival, setShowArrival] = useState(false);

  const [arrivalDate, setArrivalDate] = useState(today);

  const onChangeBirthDate = (selectedDate) => {
    setShowBirth(false);
    if (selectedDate.type !== "dismissed") {
      let timestamp = new Date(selectedDate.nativeEvent.timestamp);
      setbirthDate(timestamp);
    }
  };

  const onChangeArrivalDate = (selectedDate) => {
    setShowArrival(false);
    if (selectedDate.type !== "dismissed") {
      let timestamp = new Date(selectedDate.nativeEvent.timestamp);
      setArrivalDate(timestamp);
    }
  };

  const showDatepickerBirth = () => {
    setbirthDate(today);
    setShowBirth(true);
  };

  const showDatepickerArrival = () => {
    setShowArrival(true);
  };

  const [Roles, setRoles] = React.useState([
    { label: "Administrateur", value: "60381739c7e71a89252b8844" },
    { label: "Salarié", value: "60381701c7e71a89252b8843" },
    { label: "Développeur", value: "603ea811b4a9d056a48fccd7" },
    { label: "Direction", value: "603ea81cb4a9d056a48fccd8" },
    { label: "Ressource Humaine", value: "603ea826b4a9d056a48fccd9" },
  ]);

  const [Title, setTitle] = React.useState([
    { label: "Madame", value: "Madame" },
    { label: "Monsieur", value: "Monsieur" },
    { label: "Mademoiselle", value: "Mademoiselle" },
    { label: "Autres", value: "Autres" },
  ]);

  const sendAddEmployee = async (values) => {
    // console.log(values)
    if (!loading) {
      setLoading(true);
      await addEmployeeApi(token, values).then((result) => {
        setResultAddEmployee(result);
      });
    } else {
      console.log("loading");
    }
  };

  const getAllService = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      `http://${process.env.REACT_APP_API_HOST}/api/services?populate=1`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        let array = [];
        result.forEach((elem) => {
          array.push({
            label: `${elem.name}`,
            value: elem._id,
          });
        });
        setResultGetServices(array);
      })
      .catch((error) => console.log("error : ", error));
  };

  useEffect(() => {
    setLoading(false);
  }, [resultAddEmployee]);

  useEffect(() => {
    if (resultAddEmployee._id) {
      toggleOverlayAdd();
    } else {
      getAllService();
    }
  }, [resultAddEmployee]);

  return (
    <View
      style={{
        width: Dimensions.get("window").width - 100,
      }}
    >
      <Text
        style={{
          marginTop: 5,
          marginBottom: 18,
          fontSize: 17,
          alignSelf: "center",
        }}
      >
        Ajout d'un utilisateur
      </Text>
      <Formik
        initialValues={{
          title: "",
          lastname: "",
          firstname: "",
          mail: "",
          tel: "",
          date_birth: "",
          social_security_nb: "",
          postal_code: "",
          street_nb: "",
          street: "",
          city: "",
          id_role: "",
          id_service: "",
          arrival_date: "",
          // title: "",
          // lastname: "Pottier",
          // firstname: "Domitille",
          // mail: "dopitter@gmail.com",
          // tel: "0649826159",
          // date_birth: "",
          // social_security_nb: "2980857403863",
          // postal_code: "51100",
          // street_nb: "27",
          // street: "rue des moulins",
          // city: "Reims",
          // id_role: "",
          // id_service: "",
          // arrival_date: "",
        }}
        validationSchema={AddEmployeeSchema}
        onSubmit={(values) => sendAddEmployee(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <View>
              <View
                style={{
                  margin: 10,
                  marginBottom: 15,
                  height: heightDropdownTitle,
                }}
              >
                <DropDownPicker
                  onChangeItem={(item) => (values.title = item.value)}
                  onBlur={(item) => (values.title = item.value)}
                  items={Title}
                  value={values.title}
                  placeholder="Civilité"
                  containerStyle={{ height: 40 }}
                  style={{ backgroundColor: color.COLORS.DEFAULT }}
                  labelStyle={{ textTransform: "capitalize" }}
                  dropDownStyle={{ backgroundColor: color.COLORS.DEFAULT }}
                  onOpen={() => setHeightDropdownTitle(190)}
                  onClose={() => setHeightDropdownTitle(40)}
                  dropDownMaxHeight={heightDropdownTitle - 40}
                />
                <Text style={screen.errorDropdown}>{errors.title}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Input
                    style={screen.input}
                    onChangeText={handleChange("lastname")}
                    onBlur={handleBlur("lastname")}
                    value={values.lastname}
                    placeholder="Nom"
                    errorMessage={errors.lastname}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    style={screen.input}
                    onChangeText={handleChange("firstname")}
                    onBlur={handleBlur("firstname")}
                    value={values.firstname}
                    placeholder="Prénom"
                    errorMessage={errors.firstname}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Input
                    style={screen.input}
                    onChangeText={handleChange("tel")}
                    onBlur={handleBlur("tel")}
                    value={values.tel}
                    placeholder="Téléphone"
                    errorMessage={errors.tel}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <View>
                    <Pressable onPress={showDatepickerBirth}>
                      <Input
                        style={screen.input}
                        value={birthDate && formatDisplay(birthDate)}
                        placeholder="Date de naissance"
                        errorMessage={errors.date_birth}
                        disabledInputStyle={{ color: color.COLORS.BLACK }}
                        disabled
                      />
                    </Pressable>
                  </View>
                  {showBirth && (
                    <DateTimePicker
                      testID="dateTimePickerDateBirth"
                      value={birthDate}
                      locale="fr-FR"
                      mode="date"
                      display="default"
                      onChange={
                        (item) => {
                          onChangeBirthDate(item)
                          values.date_birth = formatAPI(item.nativeEvent.timestamp);
                        }
                      }
                    />
                  )}
                </View>
              </View>
              <Input
                style={screen.input}
                onChangeText={handleChange("mail")}
                onBlur={handleBlur("mail")}
                value={values.mail}
                placeholder="Email"
                errorMessage={errors.mail}
              />
              <Input
                style={screen.input}
                onChangeText={handleChange("social_security_nb")}
                onBlur={handleBlur("social_security_nb")}
                value={values.social_security_nb}
                placeholder="Numéro de sécurité social"
                errorMessage={errors.social_security_nb}
              />
            </View>
            <View>
              <Text style={{ fontSize: 15 }}>Adresse</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Input
                    style={screen.input}
                    onChangeText={handleChange("street_nb")}
                    onBlur={handleBlur("street_nb")}
                    value={values.street_nb}
                    placeholder="N°"
                    errorMessage={errors.street_nb}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    style={screen.input}
                    onChangeText={handleChange("street")}
                    onBlur={handleBlur("street")}
                    value={values.street}
                    placeholder="Rue"
                    errorMessage={errors.street}
                  />
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Input
                      style={screen.input}
                      onChangeText={handleChange("city")}
                      onBlur={handleBlur("city")}
                      value={values.city}
                      placeholder="Ville"
                      errorMessage={errors.city}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Input
                      style={screen.input}
                      onChangeText={handleChange("postal_code")}
                      onBlur={handleBlur("postal_code")}
                      value={values.postal_code}
                      placeholder="Code Postal"
                      errorMessage={errors.postal_code}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                margin: 10,
                marginBottom: 15,
                height: heightDropdownService,
              }}
            >
              <DropDownPicker
                onChangeItem={(item) => (values.id_service = item.value)}
                onBlur={(item) => (values.id_service = item.value)}
                items={resultGetServices}
                value={values.id_service}
                placeholder="Service"
                searchable={true}
                searchablePlaceholder="Rechercher"
                searchableError={() => <Text>Aucun résultat</Text>}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: color.COLORS.DEFAULT }}
                labelStyle={{ textTransform: "capitalize" }}
                dropDownStyle={{ backgroundColor: color.COLORS.DEFAULT }}
                onOpen={() => setHeightDropdownService(250)}
                onClose={() => setHeightDropdownService(40)}
                dropDownMaxHeight={heightDropdownService - 40}
              />
              <Text style={screen.errorDropdown}>{errors.id_service}</Text>
            </View>
            <View
              style={{
                margin: 10,
                marginBottom: 15,
                height: heightDropdownRole,
              }}
            >
              <DropDownPicker
                onChangeItem={(item) => (values.id_role = item.value)}
                onBlur={(item) => (values.id_role = item.value)}
                items={Roles}
                value={values.id_role}
                placeholder="Rôle"
                searchable={true}
                searchablePlaceholder="Rechercher"
                searchableError={() => <Text>Aucun résultat</Text>}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: color.COLORS.DEFAULT }}
                labelStyle={{ textTransform: "capitalize" }}
                dropDownStyle={{ backgroundColor: color.COLORS.DEFAULT }}
                onOpen={() => setHeightDropdownRole(300)}
                onClose={() => setHeightDropdownRole(40)}
                dropDownMaxHeight={heightDropdownRole - 40}
              />
              <Text style={screen.errorDropdown}>{errors.id_role}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12 }}>
                  Jour d'arrivé du salarié :{" "}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Pressable onPress={showDatepickerArrival}>
                  <Input
                    style={screen.input}
                    value={arrivalDate && formatDisplay(arrivalDate)}
                    placeholder="Date d'arrivé"
                    errorMessage={errors.arrival_date}
                    disabledInputStyle={{ color: color.COLORS.BLACK }}
                    disabled
                  />
                </Pressable>
              </View>
              {showArrival && (
                <DateTimePicker
                  testID="dateTimePickerDateArrival"
                  value={arrivalDate}
                  locale="fr-FR"
                  mode="date"
                  display="default"
                  onChange={
                    (item) => {
                      onChangeArrivalDate(item)
                      values.arrival_date = formatAPI(item.nativeEvent.timestamp);
                    }
                  }
                />
              )}


            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Button
                  title="Annuler"
                  onPress={() => toggleOverlayAdd()}
                  buttonStyle={screen.buttonCancel}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  onPress={handleSubmit}
                  title="Valider"
                  buttonStyle={loading ? "" : screen.button}
                  loading={loading ? true : false}
                  type={loading ? "clear" : "solid"}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
});
