export const cancelHolidayApi = async (item, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: "",
    redirect: "follow",
  };
  let res;
  await fetch(
    `http://${process.env.REACT_APP_API_HOST}/api/holidays/status/annulé/${item._id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      res = result;
    })
    .catch((error) => console.log("error", error));
  return res;
};
