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
import { updateEmployeeApi } from "../../requestApi";
import { OverlayPhoto } from "./OverlayPhoto";
import { DatePicker } from "../DatePicker";

const EditEmployeeSchema = Yup.object().shape({
  title: Yup.string().required("Champ obligatoire"),
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
  id_role: Yup.string().required("Champ obligatoire"),
  id_service: Yup.string().required("Champ obligatoire"),
  arrival_date: Yup.string().required("Champ onligatoire"),
});

export const Profil = ({ allTitles }) => {
  const { token, user } = useContext(AuthContext);
  const employee = user;
  const [resultEditEmployee, setResultEditEmployee] = React.useState("");
  const [heightDropdownTitle, setHeightDropdownTitle] = React.useState(40);
  const [loading, setLoading] = React.useState(true);

  const today = new Date();
  const [birthDate, setbirthDate] = useState(new Date(employee.date_birth));
  const [arrivalDate, setArrivalDate] = useState(new Date(employee.arrival_date));

  const [image, setImage] = useState(employee.photo_url && { uri: `http://${process.env.REACT_APP_API_HOST}/uploads/${employee.photo_url}` });
  const [visible, setVisible] = useState(false);

  const toggleOverlayPhoto = () => {
    setVisible(!visible);
  };

  const sendEditEmployee = async (values) => {
    values.photo = image;
    values.active = employee.active;
    if (!loading) {
      setLoading(true);
      await updateEmployeeApi(token, values, employee._id).then((result) => {
        console.log(result)
        setResultEditEmployee(result);
      });
    } else {
      console.log("loading");
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [resultEditEmployee]);

  return (
    <View>
      <Text style={screen.h1}>Mon profil</Text>
      {resultEditEmployee.code == "5" && <Text style={screen.error}>Contenue de la requête invalide</Text>}
      {resultEditEmployee.code == "6" && <Text style={screen.error}>ID employée non valide</Text>}
      {resultEditEmployee.code == "7" && <Text style={screen.error}>ID role non valide</Text>}
      {resultEditEmployee.code == "8" && <Text style={screen.error}>Email déjà utilié</Text>}
      {resultEditEmployee.code == "9" && <Text style={screen.error}>ID service non valide</Text>}
      {resultEditEmployee.code == "10" && <Text style={screen.error}>Impossible de mettre à jour le service de cet employé, cet employé est manager d'un service</Text>}
      {resultEditEmployee.code == "11" && <Text style={screen.error}>Impossible de désactiver cet employé, cet employé est manager d'un service</Text>}
      {resultEditEmployee.code == "12" && <Text style={screen.error}>Impossible de désactiver cet employé, Cet employé a une demande de congé</Text>}
      {resultEditEmployee.message && !resultEditEmployee.error && <Text style={screen.sucess}>Utilisateur modifié</Text>}
      <Formik
        initialValues={{
          title: employee.title,
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
          id_role: employee.id_role._id,
          id_service: employee.id_service._id,
          arrival_date: employee.date_birth,
          // title: "",
          // lastName: "test",
          // firstName: "test",
          // mail: "test@test.test",
          // tel_nb: "1111111111",
          // date_birth: formatAPI(birthDate),
          // social_security_number: "1111111111111",
          // postal_code: "51100",
          // street_nb: "27",
          // street: "test",
          // city: "Reims",
          // id_role: "",
          // id_service: "",
          // arrival_date: formatAPI(arrivalDate),
        }}
        validationSchema={EditEmployeeSchema}
        onSubmit={(values) => sendEditEmployee(values)}
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
                    title={values.lastName && values.firstName && values.lastName[0] + values.firstName[0]}
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
                      containerStyle={{ backgroundColor: color.COLORS.GREY, position: 'absolute', left: 75 }}
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
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      value={values.lastName}
                      placeholder="Nom"
                      errorMessage={errors.lastName}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Input
                      style={screen.input}
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      value={values.firstName}
                      placeholder="Prénom"
                      errorMessage={errors.firstName}
                    />
                  </View>
                </View>
              </View>
              <View style={{ margin: 10, marginBottom: 15, height: heightDropdownTitle }}>
                <DropDownPicker
                  onChangeItem={(item) => (setFieldValue("title", item.value))}
                  items={allTitles}
                  value={values.title}
                  placeholder="Civilité"
                  containerStyle={{ height: 40 }}
                  style={{ backgroundColor: color.COLORS.DEFAULT }}
                  labelStyle={{ textTransform: "capitalize" }}
                  dropDownStyle={{ backgroundColor: color.COLORS.DEFAULT }}
                  onOpen={() => setHeightDropdownTitle(190)}
                  onClose={() => setHeightDropdownTitle(40)}
                  dropDownMaxHeight={heightDropdownTitle - 40}
                  defaultValue={values.title}
                />
                <Text style={screen.errorDropdown}>{errors.title}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Input
                  style={screen.input}
                  onChangeText={handleChange("tel_nb")}
                  onBlur={handleBlur("tel_nb")}
                  value={values.tel_nb}
                  placeholder="Téléphone"
                  errorMessage={errors.tel_nb}
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
                onChangeText={handleChange("social_security_number")}
                onBlur={handleBlur("social_security_number")}
                value={values.social_security_number}
                placeholder="Numéro de sécurité social"
                errorMessage={errors.social_security_number}
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
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 10, paddingBottom: 20 }}>
                  <Text >Service :</Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  style={screen.input}
                  value={employee.id_service.name}
                  placeholder="Service"
                  disabled
                />
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 10, paddingBottom: 20 }}>
                  <Text >Role :</Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  style={screen.input}
                  value={employee.id_role.name}
                  placeholder="Role"
                  disabled
                />
              </View>
            </View>


            <View style={{ flexDirection: "row" }}>
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