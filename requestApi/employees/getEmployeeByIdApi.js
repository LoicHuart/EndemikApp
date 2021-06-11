/**
 * @param {String} token
 * @param {Boolean} populate
 */
export const getEmployeeByIdApi = async (token, id, populate) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify();

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    var val

    await fetch(
        `http://${process.env.REACT_APP_API_HOST}/api/employees/${id}?populate=${populate && 1}`,
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => {
            val = result
            // console.log('result' + result)
        })
        .catch((error) => console.log("error", error));
    return val
};