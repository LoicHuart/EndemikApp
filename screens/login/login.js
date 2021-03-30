import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
} from "react-native";
import color from "../../constants/color";
import { login as loginStyle } from "../../styles/";
import { AuthContext } from "../../context/AuthContext";
import { Button, Input, Icon } from "react-native-elements"



export const login = ({ navigation }) => {
  const { signIn, signOut } = useContext(AuthContext);
  const [email, setEmail] = useState("ssf@test.com");
  const [password, setPassword] = useState("GTZFjbS6");

  const submit = () => {
    let data = {
      email: email,
      password: password,
    };
    signIn(data);
  };
  return (
    <View style={loginStyle.container}>
      <StatusBar animated={true} backgroundColor={color.COLORS.PRIMARY} />
      <ImageBackground source={require("../../assets/background-login.png")} style={loginStyle.image}>
        <View style={{ alignItems: "center", flex: 2, paddingTop:50}}>
          <Image
            style={{ width: 300, height: 100, margin: 0 }}
            source={require("../../assets/logo-endemik.png")}
          ></Image>
        </View>
        <Text style={loginStyle.title}>Connexion</Text>
        <View style={loginStyle.card}>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            leftIcon={
              <Icon
                name='envelope'
                type='font-awesome'
                color={color.COLORS.GREY}
                style={{width:35}}
              />
            }
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon={
              <Icon
                name='unlock-alt'
                type='font-awesome'
                color={color.COLORS.GREY}
                style={{width:35}}
              />
            }
          />
          <Button
            buttonStyle={loginStyle.button}
            color={color.COLORS.PRIMARY}
            title="Se connecter"
            onPress={submit}
          />

          <Text onPress={() => console.log("mdp forget")} style={loginStyle.mdp}>
            Mot de passe oublié
          </Text>

        </View>
      
        <View style={{ flex: 3 }}></View>
      </ImageBackground>
    </View>
  );
};
