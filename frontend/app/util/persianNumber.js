const latinToPersianMap = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
const latinNumbers = [
  /1/g,
  /2/g,
  /3/g,
  /4/g,
  /5/g,
  /6/g,
  /7/g,
  /8/g,
  /9/g,
  /0/g,
];
const formatNumber = (input) => {
  let output = "";
  for (let i = 0; i < 10; i++) {
      output = input.replace(latinNumbers[i], latinToPersianMap[i]);
  }
  return output;
};
export default {
    formatNumber
}
