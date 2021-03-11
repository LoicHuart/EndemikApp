import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ImageBackground,
  Image,
  StatusBar,
} from "react-native";
import color from "../../constants/color";

import { AuthContext } from "../../context/AuthContext";

export const login = ({ navigation }) => {
  const { signIn, signOut } = useContext(AuthContext);
  const [email, setEmail] = useState("test2@test.com");
  const [password, setPassword] = useState("dTiXILJD");

  const submit = () => {
    let data = {
      email: email,
      password: password,
    };
    signIn(data);
  };
  const image = {
    uri: "https://zupimages.net/up/21/10/p7y5.png",
  };
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={color.COLORS.PRIMARY} />
      <ImageBackground source={image} style={styles.image}>
        <View style={{ alignItems: "center", flex: 3 }}>
          <Image
            style={{ width: 300, height: 100, margin: 0 }}
            source={require("../../assets/logo-endemik.png")}
          ></Image>
        </View>
        <Text style={styles.title}>Connexion</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={{ height: 5 }}></View>
          <Button
            style={styles.button}
            color={color.COLORS.PRIMARY}
            title="Sign in"
            onPress={submit}
          />
          <View style={{ height: 20 }}></View>
          <Text
            onPress={() => {
              console.log("mdp forget");
            }}
          >
            mdp oublié{" "}
          </Text>
        </View>
        <View style={{ flex: 3 }}></View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderStyle: "solid",
    marginVertical: 5,
    backgroundColor: color.COLORS.WHITE,
  },
  form: {
    marginVertical: 50,
    marginHorizontal: 10,
    backgroundColor: color.COLORS.DEFAULT,
    padding: 40,
    marginHorizontal: 40,
    borderRadius: 15,

    flex: 5,
  },
  title: {
    textAlign: "center",
    color: color.COLORS.WHITE,
    fontSize: 30,
    flex: 2,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  button: {
    borderRadius: 30,
  },
});
