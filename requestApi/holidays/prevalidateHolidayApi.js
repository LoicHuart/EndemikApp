export const prevalideHoliday = (token, item) => {
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
    `http://${process.env.REACT_APP_API_HOST}/api/holidays/status/prévalidé/${item._id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
