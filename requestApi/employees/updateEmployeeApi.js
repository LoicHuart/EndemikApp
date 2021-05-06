/**
 * @param {String} token
 * @param {Array} values
 * @param {String} id
 */
export const updateEmployeeApi = async (token, values, id) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var formdata = new FormData();
  formdata.append("title", values.title);
  formdata.append("firstName", values.firstName);
  formdata.append("lastName", values.lastName);
  formdata.append("date_birth", values.date_birth);
  formdata.append("social_security_number", values.social_security_number);
  formdata.append("mail", values.mail);
  formdata.append("tel_nb", values.tel_nb);
  formdata.append("postal_code", values.postal_code);
  formdata.append("street_nb", values.street_nb);
  formdata.append("street", values.street);
  formdata.append("city", values.city);
  formdata.append("arrival_date", values.arrival_date);
  formdata.append("id_service", values.id_service);
  formdata.append("id_role", values.id_role);
  formdata.append("children_nb", 0);
  formdata.append("active", values.active);

  // console.log(formdata);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  var val;

  await fetch(
    `http://${process.env.REACT_APP_API_HOST}/api/employees/${id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      // console.log(result);
      val = result;
    })
    .catch((error) => console.log("error", error));
  return val;
};
