export const sortJson = ( json, field, sort ) => {
let returnJson = []
switch (sort) {
  case 'A-Z':
    // console.log('A-Z')
    field = field.split('.')
    returnJson = json.sort((a, b) => {
      field.forEach(element => {
        a = itemToField(a, element)
        b = itemToField(b, element)
      });
      return a.toLowerCase().localeCompare(b.toLowerCase(),'fr', {ignorePunctuation: true})
    })
    
    break;

    case 'Z-A':
      // console.log('Z-A')
      field = field.split('.')
      returnJson = json.sort((a, b) => {
        field.forEach(element => {
          a = itemToField(a, element)
          b = itemToField(b, element)
        });
        return b.toLowerCase().localeCompare(a.toLowerCase(),'fr', {ignorePunctuation: true})
      })
      break;
  default:
    break;
}
// console.log(returnJson)
return returnJson

};

const itemToField = (item, field) => {
  return item[field]
}