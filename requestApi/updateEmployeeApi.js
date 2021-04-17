import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export const updateEmployeeApi = async (values) => {
  const { token } = useContext(AuthContext);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  // var formdata = new FormData();

  // formdata.append("title", values.title);
  // formdata.append("firstName", values.firstname);
  // formdata.append("lastName", values.lastname);
  // formdata.append("date_birth", values.date_birth);
  // formdata.append("social_security_number", values.social_security_nb);
  // formdata.append("mail", values.mail);
  // formdata.append("tel_nb", values.tel);
  // formdata.append("postal_code", values.postal_code);
  // formdata.append("street_nb", values.street_nb);
  // formdata.append("street", values.street);
  // formdata.append("city", values.city);
  // formdata.append("arrival_date", "2000-12-20");
  // formdata.append("id_service", values.id_service);
  // formdata.append("id_role", values.id_role);
  // formdata.append("children_nb", 0);

  var raw = JSON.stringify(values);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch(
    `http://${process.env.REACT_APP_API_HOST}/api/employees/60525dcfc417710570e8c9fa`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => console.log("error", error));
};