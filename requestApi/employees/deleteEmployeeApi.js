/**
 * @param {String} token
 * @param {String} id
 */
export const deleteEmployeeApi = async (token, id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = "";

    var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    var val

    await fetch(
        `http://${process.env.REACT_APP_API_HOST}/api/employees/${id}`,
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