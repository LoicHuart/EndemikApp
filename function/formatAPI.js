export const formatAPI = (date) => {
  date = new Date(date);
  let day = date.getDate();
  if (day.toString().length < 2) {
    day = "0" + day;
  }
  let month = date.getMonth() + 1;
  if (month.toString().length < 2) {
    month = "0" + month;
  }
  return date.getFullYear() + "-" + month + "-" + day;
};
