export const searchInJson = ( json, searchField, string ) => {
  try {
    var returnItem = []
    if(string) {
      string = string.toLowerCase()
    }else{
      string = ''
    }
    json.forEach(item => {
      for (let fields of searchField) {
        let item2 = item
        let field = fields.split('.')
  
        field.forEach(element => {
          item2 = itemToField(item2, element)
        });
  
        item2 = item2.toLowerCase();
        if(item2.search(string) != -1) {
  
          returnItem.push(item)
          break
        }
      }
    });
    return (returnItem)
  } catch (error) {
    console.log("error when search in json")
    return json
  }  
};

const itemToField = (item, field) => {
  return item[field]
}