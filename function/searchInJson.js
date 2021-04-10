export const searchInJson = ( json, searchField, string ) => {
  var returnItem = []
  json.forEach(item => {
    for (let fields of searchField) {
      let item2 = item

      let field = fields.split('.')

      field.forEach(element => {
        item2 = itemToField(item2, element)
      });

      if(item2.search(string) != -1) {

        returnItem.push(item)
        break
      }
    }
  });
  console.log(returnItem)
  return (returnItem)
};

const itemToField = (item, field) => {
  return item[field]
}