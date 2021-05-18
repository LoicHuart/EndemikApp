/**
 * @param {String} token
 * @param {Array} values
 * @param user
 */

export const addHolidayApi = async (holiday, token, user) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    note: holiday.note,
    starting_date: holiday.startDate,
    ending_date: holiday.endDate,
    type: holiday.type,
    id_requester_employee: user._id,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  let res;
  await fetch(
    `http://${process.env.REACT_APP_API_HOST}/api/holidays`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      res = result;
    })
    .catch((error) => console.log("error", error));
  return res;
};
