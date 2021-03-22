import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  ImageBackground,
  Image,
  StatusBar,
} from "react-native";
import color from "../../constants/color";
import { login as loginStyle } from "../../styles/"
import { AuthContext } from "../../context/AuthContext";

export const login = ({ navigation }) => {
  const { signIn, signOut } = useContext(AuthContext);
  const [email, setEmail] = useState("thetest22@truc.com");
  const [password, setPassword] = useState("h1QHMRk1");

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
    <View style={loginStyle.container}>
      <StatusBar animated={true} backgroundColor={color.COLORS.PRIMARY} />
      <ImageBackground source={image} style={loginStyle.image}>
        <View style={{ alignItems: "center", flex: 3 }}>
          <Image
            style={{ width: 300, height: 100, margin: 0 }}
            source={require("../../assets/logo-endemik.png")}
          ></Image>
        </View>
        <Text style={loginStyle.title}>Connexion</Text>
        <View style={loginStyle.form}>
          <TextInput
            style={loginStyle.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={loginStyle.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={{ height: 5 }}></View>
          <Button
            style={loginStyle.button}
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
