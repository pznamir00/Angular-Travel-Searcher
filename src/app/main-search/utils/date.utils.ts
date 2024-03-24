export const dateToSimpleFormat = function (date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthStr = month < 10 ? '0' + month : month;
  const dayStr = day < 10 ? '0' + day : day;
  return year + '-' + monthStr + '-' + dayStr;
};
