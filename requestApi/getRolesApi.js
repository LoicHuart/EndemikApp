/**
 * @param {String} token
 */
export const getRolesApi = async (token) => {
    let roles = ([
        { label: "Administrateur", value: "60381739c7e71a89252b8844" },
        { label: "Salarié", value: "60381701c7e71a89252b8843" },
        { label: "Développeur", value: "603ea811b4a9d056a48fccd7" },
        { label: "Direction", value: "603ea81cb4a9d056a48fccd8" },
        { label: "Ressource Humaine", value: "603ea826b4a9d056a48fccd9" },
    ]);
    return roles
}