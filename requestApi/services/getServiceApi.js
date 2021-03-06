/**
 * @param {String} token
 * @param {Boolean} populate
 */
export const getServiceApi = async (token, populate) => {
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
        `http://${process.env.REACT_APP_API_HOST}/api/services?populate=${populate && 1}`,
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => {
            // console.log(result)
            val = result
        })
        .catch((error) => console.log("error", error));
    return val
};