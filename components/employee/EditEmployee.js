import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import color from "../../constants/color";
import { Button, Input } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { Dimensions } from "react-native";
import { screen } from "../../styles/screen";

const EditEmployeeSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "2 caractères minimum")
    .max(50, "50 caractères maximum")
    .required("Champ obligatoire"),
  lastName: Yup.string()
    .min(2, "2 caractères minimum")
    .max(50, "50 caractères maximum")
    .required("Champ obligatoire"),
  mail: Yup.string()
    .email()
    .min(2, "2 caractères minimum")
    .max(50, "50 caractères maximum")
    .required("Champ obligatoire"),
  tel_nb: Yup.string()
    .min(10, "10 caractères")
    .max(10, "10 caractères")
    .required("Champ obligatoire"),
  date_birth: Yup.string().required("Champ obligatoire"),
  social_security_number: Yup.string()
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
  // id_role: Yup.string().required("Champ obligatoire"),
  // id_service: Yup.string().required("Champ obligatoire"),
});

export const EditEmployee = ({ toggleOverlayEdit, employee }) => {
  // console.log(employee);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);
  const [resultEditEmployee, setResultEditEmployee] = React.useState("");
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

  const sendEditEmployee = async (values) => {
    console.log(JSON.stringify(values));
    if (!loading) {
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDI2NWMzNTlkMTZiODJhNmM4MDFmMGMiLCJpYXQiOjE2MTQ1MzQ1MTl9.IvVNv2189ezpH7wTvp9ACdG97WPn0Tlb5rigxKeKmGI"
      );
      myHeaders.append("Content-Type", "application/json");

      // var formdata = new FormData();

      // formdata.append("title", values.title);
      // formdata.append("firstName", values.firstname);
      // formdata.append("lastName", values.lastname);
      // formdata.append("date_birth", values.date_birth);
      // formdata.append("social_security_number", values.social_security_nb);
      // formdata.append("mail", values.mail);
      // formdata.append("tel_nb", values.tel);
      // formdata.append("postal_code", values.postal_code);
      // formdata.append("street_nb", values.street_nb);
      // formdata.append("street", values.street);
      // formdata.append("city", values.city);
      // formdata.append("arrival_date", "2000-12-20");
      // formdata.append("id_service", values.id_service);
      // formdata.append("id_role", values.id_role);
      // formdata.append("children_nb", 0);

      values.holiday_balance.rtt = 101;
      values.holiday_balance.congesPayes = 101;
      var raw = JSON.stringify(values);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        "http://82.65.142.99:43000/api/employees/60525dcfc417710570e8c9fa",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
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
  }, [resultEditEmployee]);

  useEffect(() => {
    if (resultEditEmployee.message && !resultEditEmployee.error && !loading) {
      toggleOverlayEdit();
    } else {
      getAllService();
    }
  }, [loading]);

  // this.state = {
  //   service: "RH",
  // };

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
        Edition d'un compte utilisateur
      </Text>
      <Formik
        initialValues={{
          lastName: employee.lastName,
          firstName: employee.firstName,
          mail: employee.mail,
          tel_nb: employee.tel_nb,
          date_birth: employee.date_birth,
          social_security_number: employee.social_security_number,
          postal_code: employee.postal_code,
          street_nb: employee.street_nb,
          street: employee.street,
          city: employee.city,
          id_role: employee.id_role,
          id_service: employee.id_service,
        }}
        validationSchema={EditEmployeeSchema}
        onSubmit={(values) => sendEditEmployee(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <View>
              <Text style={{ fontSize: 15 }}>Civilité</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Input
                    style={styles.input}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                    placeholder="Nom"
                    errorMessage={errors.lastName}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    style={styles.inputF}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    value={values.firstName}
                    placeholder="Prénom"
                    errorMessage={errors.firstName}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Input
                    style={styles.input}
                    onChangeText={handleChange("tel_nb")}
                    onBlur={handleBlur("tel_nb")}
                    value={values.tel_nb}
                    placeholder="Téléphone"
                    errorMessage={errors.tel_nb}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    style={styles.input}
                    onChangeText={handleChange("date_birth")}
                    onBlur={handleBlur("date_birth")}
                    value={values.date_birth}
                    placeholder="Date de naissance"
                    errorMessage={errors.date_birth}
                  />
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
                onChangeText={handleChange("social_security_number")}
                onBlur={handleBlur("social_security_number")}
                value={values.social_security_number}
                placeholder="Numéro de sécurité social"
                errorMessage={errors.social_security_number}
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
                margin: 10,
                height: heightDropdown,
                flex: 1,
              }}
            >
              <DropDownPicker
                onChangeItem={(item) => (values.id_service = item.value)}
                onBlur={(item) => (values.id_service = item.value)}
                //defaultValue={setResultGetServices(employee.id_service)}
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
                margin: 10,
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
                  buttonStyle={loading ? "" : screen.buttonDanger}
                  title="Annuler"
                  onPress={() => toggleOverlayEdit()}
                  type={loading ? "clear" : "solid"}
                  loading={loading ? true : false}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  buttonStyle={loading ? "" : screen.buttonSuccess}
                  loading={loading ? true : false}
                  onPress={handleSubmit}
                  title="Valider"
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
  inputF: {
    fontSize: 12,
    borderColor: color.COLORS.BLACK,
    height: 20,
    width: "100%",
    backgroundColor: "white",
    textTransform: "capitalize",
    //borderColor: "gray",
    // borderWidth: 1,
    // borderRadius: 10,
  },
});
