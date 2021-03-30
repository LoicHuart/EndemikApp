import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import color from "../../constants/color";
import { Button, Input } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { Dimensions } from "react-native";
import { screen } from "../../styles/screen";

const SignupSchema = Yup.object().shape({
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
  tel: Yup.number()
    //   .integer()
    //   .positive()
    //   .min(10, "10 caractères minimum")
    //   .max(13, "13 caractères maximum")
    .required("Champ obligatoire"),
  date_birth: Yup.string()
    // .min(8, "8 caractères minimum")
    // .max(8, "8 caractères maximum")
    .required("Champ obligatoire"),
  role: Yup.string()
    .min(2, "2 caractères minimum")
    .max(50, "50 caractères maximum")
    .required("Champ obligatoire"),
  social_security_nb: Yup.number()
    // .positive()
    // .lessThan(14, "13 caractère maximum")
    // .moreThan(1, "13 caractère maximum")
    .required("Champ obligatoire"),
});

export const AddEmployee = ({ toggleOverlayAdd }) => {
  const { token } = useContext(AuthContext);
  const [resultAddEmployee, setResultAddEmployee] = React.useState("");

  const sendAddEmployee = async (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

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
    formdata.append("children_nb", "5");
    formdata.append("id_service", "604fa5ac2415f0519465c99a");
    formdata.append("id_role", "603ea811b4a9d056a48fccd7");
    formdata.append("holiday_balance.rtt", "0");
    formdata.append("holiday_balance.congesPayes", "0");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    try {
      const resp = await fetch(
        `http://${process.env.REACT_APP_API_HOST}/api/employees`,
        requestOptions
      );

      const respJSON = await resp.json();

      if (!resp.ok) {
        console.log("error");
        console.log(resp);
      }
      console.log(respJSON);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (resultAddEmployee._id) {
      toggleOverlayAdd();
    } else {
      console.log("Else");
    }
  }, [resultAddEmployee]);

  return (
    //<View style={styles.form}>{children}</View>;
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
          lastname: "",
          firstname: "",
          mail: "",
          tel: "",
          date_birth: "",
          role: "",
          social_security_nb: "",
          postal_code: "",
          street_nb: "",
          street: "",
          city: "",
          // lastname: "Pottier",
          // firstname: "Domitille",
          // mail: "dopitter@gmail.com",
          // tel: "0649826159",
          // date_birth: "1998-08-30",
          // role: "RH",
          // social_security_nb: "2980857403863",
          // postal_code: "51100",
          // street_nb: "27",
          // street: "rue des moulins",
          // city: "Reims",
        }}
        onSubmit={(values) => sendAddEmployee(values)}
        validationSchema={SignupSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <View>
              <Text style={{ fontSize: 15 }}>Civilité</Text>
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
                onChangeText={handleChange("role")}
                onBlur={handleBlur("role")}
                value={values.role}
                placeholder="Röle"
                errorMessage={errors.role}
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
