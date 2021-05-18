export const validateHoliday = (item, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: "",
    redirect: "follow",
  };

  fetch(
    `http://${process.env.REACT_APP_API_HOST}/api/holidays/status/validé/${item._id}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
