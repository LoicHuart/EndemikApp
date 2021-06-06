/**
 * @param {String} token
 */
export const getRolesApi = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    var val

    await fetch(
        `http://${process.env.REACT_APP_API_HOST}/api/employees/roles`,
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => {
            val = result
            // console.log(result)
        })
        .catch((error) => console.log("error", error));
    return val
};