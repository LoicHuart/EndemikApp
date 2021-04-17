/**
 * @param {String} token
 * @param {Array} id
 */
export const deleteServiceApi = async (token, id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
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