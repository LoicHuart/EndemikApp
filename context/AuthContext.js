import React, { useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

export const AuthContext = React.createContext();

export const AuthContextProvier = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            token: action.token,
            service: action.service,
            id: action.id,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            token: action.token,
            service: action.service,
            id: action.id,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            token: null,
            service: null,
            id: null,
          };
      }
    },
    {
      token: null,
      service: null,
      id: null,
    }
  );

  useEffect(() => {
    const checkIfTokenExist = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem("token");
        if (userToken !== null) {
          var decoded = jwt_decode(userToken);
          dispatch({
            type: "RESTORE_TOKEN",
            token: userToken,
            service: decoded.service,
            id: decoded.user_id,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    checkIfTokenExist();
  }, []);

  const signIn = async (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ email: data.email, password: data.password });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const resp = await fetch(
        "http://192.168.1.13:8080/api/auth",
        requestOptions
      );

      const respJSON = await resp.json();

      if (!resp.ok) {
        console.log("error");
        console.log(resp);
      }

      await AsyncStorage.setItem("token", respJSON.token);
      var decoded = jwt_decode(respJSON.token);
      dispatch({
        type: "SIGN_IN",
        token: respJSON.token,
        service: decoded.service,
        id: decoded.user_id,
      });
      console.log("singIn");
      console.log(await AsyncStorage.getItem("token"));
    } catch (error) {
      console.log("error", error);
    }
  };

  const signOut = async () => {
    await AsyncStorage.setItem("token", "");
    dispatch({ type: "SIGN_OUT" });

    console.log("singOut");
    console.log(await AsyncStorage.getItem("token"));
  };

  return (
    <AuthContext.Provider
      value={{
        user: state,
        signIn: signIn,
        signOut: signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
