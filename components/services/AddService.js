import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import color from "../../constants/color";
import { AuthContext } from "../../context/AuthContext";
import DropDownPicker from "react-native-dropdown-picker";
import { screen } from "../../styles/";

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
  const [loading, setLoading] = React.useState(true);
  const [heightDropdown, setHeightDropdown] = React.useState(40);

  const sendAddServices = async (value) => {
    if (!loading) {
      setLoading(true);
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
    } else {
      console.log("loading");
    }
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
    setLoading(false);
  }, [resultAddService]);

  useEffect(() => {
    // console.log(loading)
    // console.log(resultAddService._id)
    if (resultAddService._id && !loading) {
      toggleOverlayAdd();
    } else {
      getAllEmployee();
    }
  }, [loading]);

  return (
    <View>
      <Text style={screen.h1}>Ajout d'un service</Text>
      {resultAddService.error && (
        <Text style={screen.error}>{resultAddService.error}</Text>
      )}
      {resultAddService._id && (
        <Text style={screen.sucess}>Service Ajouté</Text>
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
            <View style={{ margin: 10, height: heightDropdown }}>
              <DropDownPicker
                onChangeItem={(item) => (values.id_manager = item.value)}
                onBlur={(item) => (values.id_manager = item.value)}
                items={resultGetEmployees}
                value={values.id_manager}
                placeholder="Manager"
                searchable={true}
                searchablePlaceholder="Rechercher"
                searchableError={() => <Text>Aucun résultat</Text>}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: color.COLORS.DEFAULT }}
                dropDownStyle={{ backgroundColor: color.COLORS.DEFAULT }}
                onOpen={() => setHeightDropdown(300)}
                onClose={() => setHeightDropdown(40)}
                dropDownMaxHeight={heightDropdown - 40}
              />
            </View>
            <Button
              onPress={handleSubmit}
              title="Valider"
<<<<<<< HEAD
              buttonStyle={loading?'':screen.button}
              loading={loading?true:false}
              type={loading?'clear':'solid'}
=======
              buttonStyle={loading ? "" : styles.button}
              loading={loading ? true : false}
              type={loading ? "clear" : "solid"}
>>>>>>> dev
            />
          </View>
        )}
      </Formik>
    </View>
  );
<<<<<<< HEAD
};
=======
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    backgroundColor: color.COLORS.PRIMARY,
    alignSelf: "flex-start",
    alignSelf: "center",
  },
  error: {
    color: color.COLORS.DANGER,
  },
  dropDown: {
    margin: 10,
  },
  sucess: {
    color: color.COLORS.SUCCESS,
  },
});
>>>>>>> dev
