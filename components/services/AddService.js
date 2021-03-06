import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import color from "../../constants/color";
import { AuthContext } from "../../context/AuthContext";
import DropDownPicker from "react-native-dropdown-picker";
import { screen } from "../../styles/";
import { addServiceApi, getEmployeeApi } from "../../requestApi/";

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
      await addServiceApi(token, value).then((result) => {
        setResultAddService(result)
      })
    } else {
      console.log("loading");
    }
  };

  const getAllEmployee = async () => {
    await getEmployeeApi(token, true)
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
  };

  useEffect(() => {
    setLoading(false);
  }, [resultAddService]);

  useEffect(() => {
    // console.log(loading)
    // console.log(resultAddService._id)
    if (resultAddService._id && !loading) {
      toggleOverlayAdd();
    }
  }, [loading]);

  return (
    <View>
      <Text style={screen.h1}>Ajout d'un service</Text>
      {resultAddService.code == "36" && <Text style={screen.error}>Contenue de la requête invalide</Text>}
      {resultAddService.code == "37" && <Text style={screen.error}>ID manager non valide</Text>}
      {resultAddService.code == "38" && <Text style={screen.error}>Ce nom de service est déjà utilisé</Text>}
      {resultAddService.code == "39" && <Text style={screen.error}>Cet employé est déjà responsable d'un service</Text>}
      {resultAddService._id && <Text style={screen.sucess}>Service Ajouté</Text>}
      <Formik
        initialValues={{
          name: "",
          site: "",
          id_manager: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => sendAddServices(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors }) => (
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
                onChangeItem={(item) => (setFieldValue("id_manager", item.value))}
                items={resultGetEmployees}
                value={values.id_manager}
                placeholder="Manager"
                searchable={true}
                searchablePlaceholder="Rechercher"
                searchableError={() => <Text>Aucun résultat</Text>}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: color.COLORS.DEFAULT }}
                dropDownStyle={{ backgroundColor: color.COLORS.DEFAULT }}
                onOpen={() => {
                  getAllEmployee()
                  setHeightDropdown(300)
                }}
                onClose={() => setHeightDropdown(40)}
                dropDownMaxHeight={heightDropdown - 40}
              />
              <Text style={screen.errorDropdown}>{errors.id_manager}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Button
                  onPress={() => toggleOverlayAdd()}
                  title="Annuler"
                  buttonStyle={screen.buttonCancel}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  onPress={handleSubmit}
                  title="Valider"
                  buttonStyle={loading ? '' : screen.button}
                  loading={loading ? true : false}
                  type={loading ? 'clear' : 'solid'}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};
