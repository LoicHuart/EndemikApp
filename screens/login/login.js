import React, { useEffect, useState, useContext } from "react";
import { Text, View, Image, StatusBar, ImageBackground } from "react-native";
import color from "../../constants/color";
import { login as loginStyle } from "../../styles/";
import { AuthContext } from "../../context/AuthContext";
import { Button, Input, Icon } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Champ obligatoire"),
  password: Yup.string()
    .required("Champ obligatoire"),
});

export const login = ({ navigation }) => {
  const { signIn, signOut } = useContext(AuthContext);
  const { error } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(false)
  }, [error]);

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
                  <Text >Identifiant incorrecte</Text>
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
      </ImageBackground>
    </View>
  );
};
