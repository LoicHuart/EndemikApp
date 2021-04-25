import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import color from "../../constants/color";
import { AuthContext } from "../../context/AuthContext";
import DropDownPicker from "react-native-dropdown-picker";
import { screen } from "../../styles/";
import { updateServiceApi } from "../../requestApi/";


const Schema = Yup.object().shape({
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

export const EditService = ({ toggleOverlayEdit, service, allEmployee }) => {
  const { token } = useContext(AuthContext);
  const [resultEditService, setResultEditService] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [heightDropdown, setHeightDropdown] = React.useState(40);

  const sendEditServices = async (value) => {
    // console.log(value)
    if (!loading) {
      setLoading(true);
      updateServiceApi(token, value, service._id)
        .then((result) => {
          setResultEditService(result);
        })
    } else {
      console.log("loading");
    }
  };


  useEffect(() => {
    setLoading(false);
  }, [resultEditService]);

  useEffect(() => {
    // console.log(loading)
    // console.log(resultEditService._id)
    if (resultEditService.message && !resultEditService.error && !loading) {
      toggleOverlayEdit();
    }
  }, [loading]);

  return (
    <View>
      <Text style={screen.h1}>Edition d'un service</Text>
      {resultEditService.error && (
        <Text style={screen.error}>{resultEditService.error}</Text>
      )}
      {resultEditService._id && (
        <Text style={screen.sucess}>Service Ajouté</Text>
      )}

      <Formik
        initialValues={{
          name: service.name,
          site: service.site,
          id_manager: service.id_manager._id,
        }}
        validationSchema={Schema}
        onSubmit={(values) => sendEditServices(values)}
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
                items={allEmployee}
                value={values.id_manager}
                placeholder="Manager"
                searchable={true}
                searchablePlaceholder="Rechercher"
                searchableError={() => <Text>Aucun résultat</Text>}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: color.COLORS.DEFAULT }}
                dropDownStyle={{ backgroundColor: color.COLORS.DEFAULT }}
                onOpen={() => {
                  setHeightDropdown(300)
                }}
                onClose={() => setHeightDropdown(40)}
                dropDownMaxHeight={heightDropdown - 40}
                defaultValue={values.id_manager}
              />
              <Text style={screen.errorDropdown}>{errors.id_manager}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Button
                  onPress={() => toggleOverlayEdit()}
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
