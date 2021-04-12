import React, { useEffect, useState, useContext } from "react";
import { Text, View, Image, StatusBar, ImageBackground } from "react-native";
import color from "../../constants/color";
import { login as loginStyle } from "../../styles/";
import { AuthContext } from "../../context/AuthContext";
import { Button, Input, Icon, Overlay } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Champ obligatoire"),
  password: Yup.string()
    .required("Champ obligatoire"),
});

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Champ obligatoire"),
});

export const login = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const { error } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [overlay, setOverlay] = React.useState(false);
  const [resultForgotPassword, setResultForgotPassword] = React.useState([]);

  const toggleOverlay = () => {
    setOverlay(!overlay)
  };

  const forgotPassword = async (email) => {
    if (!loading) {
      setLoading(true)
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(`http://${process.env.REACT_APP_API_HOST}/api/employees/forgotPassword/${email}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          // console.log(result)
          setResultForgotPassword(result)
        })
        .catch(error => console.log('error', error));
    } else {
      console.log("loading");
    }
  };

  useEffect(() => {
    setLoading(false)
  }, [error]);

  useEffect(() => {
    
    setLoading(false)
    setOverlay(false)
    
  }, [resultForgotPassword]);

  return (
    <View style={loginStyle.container}>
      <StatusBar animated={true} backgroundColor={color.COLORS.PRIMARY} />
      <ImageBackground
        source={require("../../assets/background-login.png")}
        style={loginStyle.image}
      >
        <View style={{ alignItems: "center", flex: 2, paddingTop: 50 }}>
          <Image
            style={{ width: 300, height: 100, margin: 0 }}
            source={require("../../assets/logo-endemik.png")}
          ></Image>
        </View>
        <Text style={loginStyle.title}>Connexion</Text>
        <View style={loginStyle.card}>
          <Formik
            initialValues={{
              email: "gaspard@test.fr",
              password: "egxT36sF",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              signIn(values)
              setLoading(true)
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View>
                {error && (
                  <Text style={loginStyle.error}>Identifiant incorrecte</Text>
                )}
                <Input
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  errorMessage={errors.email}
                  placeholder="Email"
                  leftIcon={
                    <Icon
                      name="envelope"
                      type="font-awesome"
                      color={color.COLORS.GREY}
                      style={{ width: 35 }}
                    />
                  }
                />
                <Input
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  errorMessage={errors.password}
                  placeholder="Mot de passe"
                  secureTextEntry
                  leftIcon={
                    <Icon
                      name="unlock-alt"
                      type="font-awesome"
                      color={color.COLORS.GREY}
                      style={{ width: 35 }}
                    />
                  }
                />
                <Text
                  onPress={toggleOverlay}
                  style={loginStyle.mdp}
                >
                  Mot de passe oublié
                </Text>
                <Button
                  onPress={handleSubmit}
                  title="Valider"
                  buttonStyle={loading?'':loginStyle.button}
                  loading={loading?true:false}
                  type={loading?'clear':'solid'}
                />
              </View>
            )}
          </Formik>
        </View>            
        <View style={{ flex: 3 }}></View>

        <Overlay
          isVisible={overlay}
          onBackdropPress={toggleOverlay}
          overlayStyle={loginStyle.overlay}
        >
          <Text style={loginStyle.h1}>Demande de nouveau mot de passe</Text>

          <Formik
            initialValues={{
              email: "gaspard@test.fr",
            }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={(values) => {
              setResultForgotPassword([])
              forgotPassword(values.email)
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View>
                {error && (
                  <Text style={loginStyle.error}>Identifiant incorrecte</Text>
                )}
                <Input
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  errorMessage={errors.email}
                  placeholder="Email"
                  leftIcon={
                    <Icon
                      name="envelope"
                      type="font-awesome"
                      color={color.COLORS.GREY}
                      style={{ width: 35 }}
                    />
                  }
                />
                <View style={{flexDirection: "row"}}>
                  <View style={{ flex: 1 }}>
                    <Button
                      onPress={toggleOverlay}
                      title="Annuler"
                      buttonStyle={loginStyle.buttonAnnuler}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Button
                      onPress={handleSubmit}
                      title="Valider"
                      buttonStyle={loading?'':loginStyle.button}
                      loading={loading?true:false}
                      type={loading?'clear':'solid'}
                    />
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </Overlay>
      </ImageBackground>
    </View>
  );
};
