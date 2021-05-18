export const getHolidaysByUserApi = async (token, id, status) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var raw = "";

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const resp = await fetch(
    `http://${process.env.REACT_APP_API_HOST}/api/holidays/user/${id}`,
    requestOptions
  );

  const respJSON = await resp.json();

  if (!resp.ok) {
    console.log("error");
    console.log(resp);
  }

  let res = [];
  respJSON.forEach((item) => {
    if (status.includes(item.status)) {
      res.push(item);
    }
  });
  return res.sort(custom_sort);
};

function custom_sort(a, b) {
  return (
    new Date(b.current_date).getTime() - new Date(a.current_date).getTime()
  );
}
