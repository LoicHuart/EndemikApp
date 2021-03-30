import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import color from "../../constants/color";
import { AuthContext } from "../../context/AuthContext";
import DropDownPicker from "react-native-dropdown-picker";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "2 caractères minimum")
    .max(50, "50 caractères maximum")
    .required("Champ obligatoire"),
  site: Yup.string()
    .min(2, "2 caractères minimum")
    .max(50, "50 caractères maximum")
    .required("Champ obligatoire"),
  id_manager: Yup.string().required("Champ obligatoire"),
});

export const AddService = ({ toggleOverlayAdd }) => {
  const { token } = useContext(AuthContext);
  const [resultAddService, setResultAddService] = React.useState("");
  const [resultGetEmployees, setResultGetEmployees] = React.useState([]);

  const sendAddServices = async (value) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(value);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    await fetch(
      `http://${process.env.REACT_APP_API_HOST}/api/services`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        setResultAddService(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getAllEmployee = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      `http://${process.env.REACT_APP_API_HOST}/api/employees`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        let array = [];
        result.forEach((elem) => {
          array.push({
            label: `${elem.firstName} ${elem.lastName}`,
            value: elem._id,
          });
        });
        setResultGetEmployees(array);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (resultAddService._id) {
      toggleOverlayAdd();
    } else {
      getAllEmployee();
    }
  }, [resultAddService]);

  return (
    <View>
      <Text style={styles.title}>Ajout d'un service</Text>
      {resultAddService.error && (
        <Text style={styles.error}>{resultAddService.error}</Text>
      )}

      <Formik
        initialValues={{
          name: "",
          site: "",
          id_manager: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => sendAddServices(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <Input
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              placeholder="Nom"
              errorMessage={errors.name}
            />
            <Input
              onChangeText={handleChange("site")}
              onBlur={handleBlur("site")}
              value={values.site}
              placeholder="site"
              errorMessage={errors.site}
            />
            <View style={styles.dropDown}>
              <DropDownPicker
                onChangeItem={(item) => (values.id_manager = item.value)}
                onBlur={(item) => (values.id_manager = item.value)}
                items={resultGetEmployees}
                value={values.id_manager}
                placeholder="Manager"
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: color.COLORS.DEFAULT }}
                dropDownStyle={{ backgroundColor: color.COLORS.DEFAULT }}
              />
            </View>
            <Button
              onPress={handleSubmit}
              title="Valider"
              buttonStyle={styles.button}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    backgroundColor: color.COLORS.SECONDARY,
    alignSelf: "flex-start",
    alignSelf: "center",
  },
  error: {
    color: color.COLORS.DANGER,
  },
  dropDown: {
    margin: 10,
  },
});
