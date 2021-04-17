/**
 * @param {string} token
 * @param {Array} values
 */
export const updateServiceApi = async (token, values, id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(values);

    var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    var val

    await fetch(
        `http://${process.env.REACT_APP_API_HOST}/api/services/${id}`,
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => {
            // console.log(result)
            val = result
        })
        .catch((error) => console.log("error", error));
    return val
}