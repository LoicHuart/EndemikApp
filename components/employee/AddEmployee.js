import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import color from "../../constants/color";
import { Button, Input, Avatar } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { screen } from "../../styles/screen";
import DropDownPicker from "react-native-dropdown-picker";
import { formatAPI } from "../../function";
import { addEmployeeApi, getRolesApi, getServiceApi } from "../../requestApi";
import { OverlayPhoto } from "./OverlayPhoto";
import { DatePicker } from "../DatePicker";

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
  const [heightDropdownRole, setHeightDropdownRole] = React.useState(40);
  const [heightDropdownTitle, setHeightDropdownTitle] = React.useState(40);
  const [heightDropdownService, setHeightDropdownService] = React.useState(40);
  const [loading, setLoading] = React.useState(true);

  const today = new Date();
  const [birthDate, setbirthDate] = useState(today);
  const [arrivalDate, setArrivalDate] = useState(today);

  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [roles, setRoles] = useState();


  const toggleOverlayPhoto = () => {
    setVisible(!visible);
  };

  const getRoles = async () => {
    await getRolesApi(token)
      .then((result) => {
        setRoles(result);
      })
  };

  const [Title, setTitle] = React.useState([
    { label: "Madame", value: "Madame" },
    { label: "Monsieur", value: "Monsieur" },
    { label: "Mademoiselle", value: "Mademoiselle" },
    { label: "Autres", value: "Autres" },
  ]);

  const sendAddEmployee = async (values) => {
    // console.log(values)
    values.photo = image;
    if (!loading) {
      setLoading(true);
      await addEmployeeApi(token, values).then((result) => {
        // console.log(result)
        setResultAddEmployee(result);
      });
    } else {
      console.log("loading");
    }
  };

  const getAllService = async () => {
    getServiceApi(token, true)
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
  };

  useEffect(() => {
    setLoading(false);
  }, [resultAddEmployee]);

  useEffect(() => {
    if (resultAddEmployee._id && !loading) {
      toggleOverlayAdd();
    }
  }, [loading]);

  return (
    <View>
      <Text style={screen.h1}>Ajout d'un utilisateur</Text>
      {resultAddEmployee.code == "1" && <Text style={screen.error}>Contenue de la requête invalide</Text>}
      {resultAddEmployee.code == "2" && <Text style={screen.error}>ID service non valide</Text>}
      {resultAddEmployee.code == "3" && <Text style={screen.error}>ID role non valide</Text>}
      {resultAddEmployee.code == "4" && <Text style={screen.error}>Email déjà utilié</Text>}
      {resultAddEmployee._id && <Text style={screen.sucess}>Uilisateur ajouté</Text>}
      <Formik
        initialValues={{
          title: "",
          lastname: "",
          firstname: "",
          mail: "",
          tel: "",
          date_birth: formatAPI(birthDate),
          social_security_nb: "",
          postal_code: "",
          street_nb: "",
          street: "",
          city: "",
          id_role: "",
          id_service: "",
          arrival_date: formatAPI(arrivalDate),
          // title: "",
          // lastname: "test",
          // firstname: "test",
          // mail: "test@test.test",
          // tel: "1111111111",
          // date_birth: formatAPI(birthDate),
          // social_security_nb: "1111111111111",
          // postal_code: "51100",
          // street_nb: "27",
          // street: "test",
          // city: "Reims",
          // id_role: "",
          // id_service: "",
          // arrival_date: formatAPI(arrivalDate),
        }}
        validationSchema={AddEmployeeSchema}
        onSubmit={(values) => sendAddEmployee(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors }) => (
          <View>
            <View>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <View style={{ flex: 0.6, alignSelf: "center", alignItems: "center" }}>
                  <Avatar
                    rounded
                    source={image && { uri: image.uri }}
                    containerStyle={!image && { backgroundColor: color.COLORS.GREY }}
                    size="large"
                    activeOpacity={0.7}
                    title={values.lastname && values.firstname && values.lastname[0] + values.firstname[0]}
                  />
                  <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                    {image &&
                      <Avatar
                        size={30}
                        rounded
                        containerStyle={{ backgroundColor: color.COLORS.GREY, position: 'absolute', left: 10 }}
                        activeOpacity={0.7}
                        icon={{
                          name: 'trash-alt',
                          type: 'font-awesome-5',
                          color: color.COLORS.DEFAULT
                        }}
                        onPress={() => setImage(null)}
                      />
                    }
                    <Avatar
                      size={30}
                      rounded
                      containerStyle={{ backgroundColor: color.COLORS.GREY, position: 'absolute', left: 65 }}
                      activeOpacity={0.7}
                      icon={{
                        name: 'pencil-alt',
                        type: 'font-awesome-5',
                        color: color.COLORS.DEFAULT
                      }}
                      onPress={toggleOverlayPhoto}
                    />
                  </View>
                </View>
                <View style={{ flex: 1 }}>
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
              </View>
              <View style={{ margin: 10, marginBottom: 15, height: heightDropdownTitle }}>
                <DropDownPicker
                  onChangeItem={(item) => (setFieldValue("title", item.value))}
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

              <View style={{ flex: 1 }}>
                <Input
                  style={screen.input}
                  onChangeText={handleChange("tel")}
                  onBlur={handleBlur("tel")}
                  value={values.tel}
                  placeholder="Téléphone"
                  errorMessage={errors.tel}
                  keyboardType="numeric"
                />
              </View>

              <Input
                style={screen.input}
                onChangeText={handleChange("mail")}
                onBlur={handleBlur("mail")}
                value={values.mail}
                placeholder="Email"
                errorMessage={errors.mail}
                keyboardType="email-address"
              />
              <Input
                style={screen.input}
                onChangeText={handleChange("social_security_nb")}
                onBlur={handleBlur("social_security_nb")}
                value={values.social_security_nb}
                placeholder="Numéro de sécurité social"
                errorMessage={errors.social_security_nb}
                keyboardType="numeric"
              />
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 10, paddingBottom: 20 }}>
                    <Text >Date d'anniversaire :</Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <DatePicker
                    onChange={
                      (date) => {
                        setbirthDate(date)
                        setFieldValue("date_birth", formatAPI(date))
                      }
                    }
                    value={birthDate}
                    errorMessage={errors.date_birth}
                    maximumDate={today}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 10, paddingBottom: 20 }}>
                    <Text >Date d'arrivé du salarié :</Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <DatePicker
                    onChange={
                      (date) => {
                        setArrivalDate(date)
                        setFieldValue("arrival_date", formatAPI(date))
                      }
                    }
                    value={arrivalDate}
                    errorMessage={errors.arrival_date}
                  />
                </View>
              </View>
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
            <View style={{ margin: 10, marginBottom: 15, height: heightDropdownService }}>
              <DropDownPicker
                onChangeItem={(item) => (setFieldValue("id_service", item.value))}
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
                onOpen={() => {
                  getAllService()
                  setHeightDropdownService(250)
                }}
                onClose={() => setHeightDropdownService(40)}
                dropDownMaxHeight={heightDropdownService - 40}
              />
              <Text style={screen.errorDropdown}>{errors.id_service}</Text>
            </View>
            <View style={{ margin: 10, marginBottom: 15, height: heightDropdownRole }}>
              <DropDownPicker
                onChangeItem={(item) => (setFieldValue("id_role", item.value))}
                items={roles}
                value={values.id_role}
                placeholder="Rôle"
                searchable={true}
                searchablePlaceholder="Rechercher"
                searchableError={() => <Text>Aucun résultat</Text>}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: color.COLORS.DEFAULT }}
                labelStyle={{ textTransform: "capitalize" }}
                dropDownStyle={{ backgroundColor: color.COLORS.DEFAULT }}
                onOpen={() => {
                  getRoles();
                  setHeightDropdownRole(300)
                }}
                onClose={() => setHeightDropdownRole(40)}
                dropDownMaxHeight={heightDropdownRole - 40}
              />
              <Text style={screen.errorDropdown}>{errors.id_role}</Text>
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
      <OverlayPhoto toggleOverlay={toggleOverlayPhoto} visible={visible} setImage={setImage}></OverlayPhoto>
    </View>
  );
};