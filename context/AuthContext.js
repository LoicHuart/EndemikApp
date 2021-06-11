import React, { useEffect, createContext, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { getEmployeeByIdApi } from "../requestApi";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            token: action.token,
            user: action.user,
            error: action.error,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            token: action.token,
            user: action.user,
            error: action.error,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            token: null,
            user: null,
            error: null,
          };
      }
    },
    {
      token: null,
      user: null,
      error: null,
    }
  );

  useEffect(() => {
    checkIfTokenExist();
  }, []);

  const checkIfTokenExist = async () => {
    let userToken;
    try {
      userToken = await AsyncStorage.getItem("token");
      if (userToken !== null) {
        var decoded = jwt_decode(userToken);
        var user = await getEmployeeByIdApi(userToken, decoded._id, true);

        if (user) {
          user = JSON.stringify(user);
        } else {
          user = await AsyncStorage.getItem("user");
        }

        dispatch({
          type: "RESTORE_TOKEN",
          token: userToken,
          user: user,
          error: null,
        });
      } else {
        console.log("pas token")
      }
    } catch (error) {
      console.log(error)
      await AsyncStorage.setItem("token", "");
      await AsyncStorage.setItem("user", "");
      dispatch({
        type: "RESTORE_TOKEN",
        token: null,
        user: null,
        error: error,
      });
    }
  };

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
        `http://${process.env.REACT_APP_API_HOST}/api/auth`,
        requestOptions
      );

      const respJSON = await resp.json();

      if (!resp.ok) {
        console.log("error");
        console.log(resp);
      }

      var decoded = jwt_decode(respJSON.token);
      let user = await getEmployeeByIdApi(respJSON.token, decoded._id, true);

      await AsyncStorage.setItem("token", respJSON.token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: "SIGN_IN",
        token: respJSON.token,
        user: JSON.stringify(user),
        error: null,
      });
      console.log("singIn");
      console.log(await AsyncStorage.getItem("token"));
      console.log(await AsyncStorage.getItem("user"));
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: "SIGN_IN",
        token: null,
        user: null,
        error: error,
      });
    }
  };

  const signOut = async () => {
    await AsyncStorage.setItem("token", "");
    await AsyncStorage.setItem("user", "");

    dispatch({
      type: "SIGN_OUT",
      error: null,
    });

    console.log("singOut");
    console.log(await AsyncStorage.getItem("token"));
    console.log(await AsyncStorage.getItem("user"));
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: JSON.parse(state.user),
        error: state.error,
        signIn: signIn,
        signOut: signOut,
        checkIfTokenExist: checkIfTokenExist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
