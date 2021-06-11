/**
 * @param {String} token
 */
export const getAllTitleEmployee = async (token) => {
    let titles = ([
        { label: "Madame", value: "madame" },
        { label: "Monsieur", value: "monsieur" },
        { label: "Mademoiselle", value: "mademoiselle" },
        { label: "Autres", value: "autres" },
    ]);
    return titles
}