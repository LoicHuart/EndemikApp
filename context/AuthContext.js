import React, { useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

export const AuthContext = React.createContext();

export const AuthContextProvier = ({ children }) => {
  const [user, setUser] = React.useState([]);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            token: action.token,
            user: action.id,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            token: action.token,
            user: action.id,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            token: null,
            user: null,
          };
      }
    },
    {
      token: null,
      user: null,
    }
  );

  const getEmployeeById = ((id, token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://${process.env.REACT_APP_API_HOST}/api/employees/${id}?populate=1`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setUser(result);
      })
      .catch(error => console.log('error', error));

    
  });

  useEffect(() => {
    const checkIfTokenExist = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem("token");
        if (userToken !== null) {
          var decoded = jwt_decode(userToken);
          getEmployeeById(decoded._id, userToken)
          dispatch({
            type: "RESTORE_TOKEN",
            token: userToken,
            user: user,
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
        `http://${process.env.REACT_APP_API_HOST}/api/auth`,
        requestOptions
      );

      const respJSON = await resp.json();

      if (!resp.ok) {
        console.log("error");
        console.log(resp);
      }

      await AsyncStorage.setItem("token", respJSON.token);
      var decoded = jwt_decode(respJSON.token);
      getEmployeeById(decoded._id, respJSON.token)
      dispatch({
        type: "SIGN_IN",
        token: respJSON.token,
        user: user,

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
        token: state.token,
        user: state.user,
        signIn: signIn,
        signOut: signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
