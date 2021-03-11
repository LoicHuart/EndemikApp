import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

import { AuthContext } from '../../context/AuthContext';

export const login = ({navigation}) => {
  const { signIn, signOut } = useContext(AuthContext);
  const [email, setEmail] = useState('test2@test.com');
  const [password, setPassword] = useState('dTiXILJD');

  const submit = () => {
    let data = {
        email: email,
        password: password
    }
    signIn(data)
}
  
  return (
    <View>
      <Text>login</Text>
      <Button
        onPress={() => navigation.goBack()}
        title="Go Back"
      />


      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title='mdp oublié'
        onPress={() => {}}
      ></Button>

      <Button title="Sign in" onPress={submit} />

    
    </View>
  );
};



const styles = StyleSheet.create({});
