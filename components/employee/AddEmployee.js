import React from "react";
import { StyleSheet, Text, View } from "react-native";
import color from "../../constants/color";
import { Button, Input } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { clockRunning } from "react-native-reanimated";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  id_manager: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const AddEmployee = ({ children }) => {
  //const { user } = useContext(AuthContext);
  const sendAddEmployee = async (value) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDI2NWMzNTlkMTZiODJhNmM4MDFmMGMiLCJpYXQiOjE2MTQ1MzQ1MTl9.IvVNv2189ezpH7wTvp9ACdG97WPn0Tlb5rigxKeKmGI`
    );
    myHeaders.append("Content-Type", "application/json");

    var formdata = new FormData();
    formdata.append("title", children.firstname);
    formdata.append("firstName", children.firstname);
    formdata.append("lastName", children.lastname);
    formdata.append("date_birth", children.date_birth);
    formdata.append("social_security_number", children.social_security_nb);
    formdata.append("mail", children.mail);
    formdata.append("tel_nb", children.tel);
    formdata.append("postal_code", children.postal_code);
    formdata.append("street_nb", children.street_nb);
    formdata.append("street", children.street);
    formdata.append("city", children.city);
    formdata.append("arrival_date", children.date_birth);
    formdata.append("children_nb", "5");
    formdata.append("id_service", "604fa5ac2415f0519465c99a");
    formdata.append("id_role", "603ea811b4a9d056a48fccd7");
    formdata.append("photo", fileInput.files[0], "");
    formdata.append("active", "true");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("localhost:8000/api/employees", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  return (
    //<View style={styles.form}>{children}</View>;
    <View>
      <Text style={{ marginTop: 5, marginBottom: 18, fontSize: 19 }}>
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
        }}
        onSubmit={(values) => sendAddEmployee(values)}
        //validationSchema={SignupSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <Text style={{ fontSize: 15, fontStyle: "italic" }}>Civilité</Text>
            <Input
              style={styles.input}
              onChangeText={handleChange("lastname")}
              onBlur={handleBlur("lastname")}
              value={values.lastname}
              placeholder="Nom"
              errorMessage={errors.lastname}
            />
            <Input
              style={styles.input}
              onChangeText={handleChange("firstname")}
              onBlur={handleBlur("firstname")}
              value={values.firstname}
              placeholder="Prénom"
              errorMessage={errors.firstname}
            />
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
              onChangeText={handleChange("tel")}
              onBlur={handleBlur("tel")}
              value={values.tel}
              placeholder="Téléphone"
              errorMessage={errors.tel}
            />
            <Input
              style={styles.input}
              onChangeText={handleChange("date_birth")}
              onBlur={handleBlur("date_birth")}
              value={values.date_birth}
              placeholder="Date de naissance"
              errorMessage={errors.date_birth}
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
            <View>
              <Button
                buttonStyle={styles.button}
                onPress={handleSubmit}
                title="Valider"
              />
              <Button
                buttonStyle={styles.button}
                onPress={handleSubmit}
                title="Annuler"
              />
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
    fontSize: 14,
    borderRadius: 15,
    borderColor: color.COLORS.BLACK,
  },
  button: {
    alignSelf: "flex-start",
    alignSelf: "center",
  },
});
