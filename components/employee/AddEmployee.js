import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
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
});

export const AddEmployee = ({ toggleOverlayAdd }) => {
  const { token } = useContext(AuthContext);
  const [resultAddEmployee, setResultAddEmployee] = React.useState("");
  const [resultGetServices, setResultGetServices] = React.useState([]);
  const [heightDropdown, setHeightDropdown] = React.useState(40);
  const [heightDropdownRole, setHeightDropdownRole] = React.useState(40);

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
    // setLoading = true;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    console.log(values.id_service);
    console.log(values.id_role);
    console.log(formatDisplay(values.date_birth));

    var formdata = new FormData();
    formdata.append("title", values.title);
    formdata.append("firstName", values.firstname);
    formdata.append("lastName", values.lastname);
    formdata.append("date_birth", values.date_birth);
    formdata.append("social_security_number", values.social_security_nb);
    formdata.append("mail", values.mail);
    formdata.append("tel_nb", values.tel);
    formdata.append("postal_code", values.postal_code);
    formdata.append("street_nb", values.street_nb);
    formdata.append("street", values.street);
    formdata.append("city", values.city);
    formdata.append("arrival_date", "2000-12-20");
    formdata.append("id_service", values.id_service);
    formdata.append("id_role", values.id_role);
    formdata.append("children_nb", 0);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `http://${process.env.REACT_APP_API_HOST}/api/employees`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setResultAddEmployee(result);
      })
      .catch((error) => console.log("error", error));
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
          // title: "",
          // lastname: "",
          // firstname: "",
          // mail: "",
          // tel: "",
          // date_birth: "",
          // role: "",
          // social_security_nb: "",
          // postal_code: "",
          // street_nb: "",
          // street: "",
          // city: "",
          title: "",
          lastname: "Pottier",
          firstname: "Domitille",
          mail: "dopitter@gmail.com",
          tel: "0649826159",
          date_birth: "1998-08-30",
          social_security_nb: "2980857403863",
          postal_code: "51100",
          street_nb: "27",
          street: "rue des moulins",
          city: "Reims",
          id_role: "",
          id_service: "",
        }}
        validationSchema={AddEmployeeSchema}
        onSubmit={(values) => sendAddEmployee(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <View>
              {/* <Text style={{ fontSize: 15 }}>Civilité</Text> */}
              <DropDownPicker
                onChangeItem={(item) => (values.title = item.value)}
                onBlur={(item) => (values.title = item.value)}
                items={Title}
                value={values.title}
                placeholder="Civilité"
                containerStyle={{ height: 40, margin: 10 }}
                style={{ backgroundColor: color.COLORS.DEFAULT }}
                labelStyle={{ textTransform: "capitalize" }}
                dropDownStyle={{ backgroundColor: color.COLORS.DEFAULT }}
                onOpen={() => setHeightDropdownRole(300)}
                onClose={() => setHeightDropdownRole(40)}
                dropDownMaxHeight={heightDropdownRole - 40}
              />
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Input
                    style={styles.input}
                    onChangeText={handleChange("lastname")}
                    onBlur={handleBlur("lastname")}
                    value={values.lastname}
                    placeholder="Nom"
                    errorMessage={errors.lastname}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    style={styles.input}
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
                    style={styles.input}
                    onChangeText={handleChange("tel")}
                    onBlur={handleBlur("tel")}
                    value={values.tel}
                    placeholder="Téléphone"
                    errorMessage={errors.tel}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    style={styles.input}
                    onChangeText={handleChange("date_birth")}
                    onBlur={handleBlur("date_birth")}
                    value={formatDisplay(values.date_birth)}
                    placeholder="Date de naissance"
                    errorMessage={errors.date_birth}
                  />

                  {/* <DateTimePicker
                    testID="dateTimePickerDateBirth"
                    value={new Date()}
                    locale="fr-FR"
                    mode="date"
                    display="default"
                    onChange={onChangeStartDate}
                    minimumDate={today}
                  /> */}
                </View>
              </View>
              <Input
                style={styles.input}
                onChangeText={handleChange("mail")}
                onBlur={handleBlur("mail")}
                value={values.mail}
                placeholder="Email"
                errorMessage={errors.mail}
              />
              <Input
                style={styles.input}
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
                    style={styles.input}
                    onChangeText={handleChange("street_nb")}
                    onBlur={handleBlur("street_nb")}
                    value={values.street_nb}
                    placeholder="N°"
                    errorMessage={errors.street_nb}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    style={styles.input}
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
                      style={styles.input}
                      onChangeText={handleChange("city")}
                      onBlur={handleBlur("city")}
                      value={values.city}
                      placeholder="Ville"
                      errorMessage={errors.city}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Input
                      style={styles.input}
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
                // margin: 10,
                // marginVertical: 10,
                marginBottom: 10,
                height: heightDropdown,
                flex: 1,
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
                containerStyle={{ height: 40, margin: 10 }}
                style={{ backgroundColor: color.COLORS.DEFAULT }}
                labelStyle={{ textTransform: "capitalize" }}
                dropDownStyle={{ backgroundColor: color.COLORS.DEFAULT }}
                onOpen={() => setHeightDropdown(250)}
                onClose={() => setHeightDropdown(40)}
                dropDownMaxHeight={heightDropdown - 40}
              />
            </View>
            <View
              style={{
                // margin: 10,
                marginVertical: 10,
                height: heightDropdownRole,
                flex: 1,
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
                containerStyle={{ height: 40, margin: 10 }}
                style={{ backgroundColor: color.COLORS.DEFAULT }}
                labelStyle={{ textTransform: "capitalize" }}
                dropDownStyle={{ backgroundColor: color.COLORS.DEFAULT }}
                onOpen={() => setHeightDropdownRole(300)}
                onClose={() => setHeightDropdownRole(40)}
                dropDownMaxHeight={heightDropdownRole - 40}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Button
                  buttonStyle={screen.buttonDanger}
                  title="Annuler"
                  onPress={() => toggleOverlayAdd()}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  buttonStyle={screen.buttonSuccess}
                  onPress={handleSubmit}
                  title="Valider"
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
  form: {
    // marginVertical: 10,
    // marginHorizontal: 10,
    // marginTop: 40,
    backgroundColor: color.COLORS.LIGHTGREY,
    // width: Dimensions.get("window").width - 30,
    // borderRadius: 15,
    // padding: 15,
  },
  input: {
    fontSize: 12,
    borderColor: color.COLORS.BLACK,
    height: 20,
    width: "100%",
    backgroundColor: "white",
    //borderColor: "gray",
    // borderWidth: 1,
    // borderRadius: 10,
  },
});
