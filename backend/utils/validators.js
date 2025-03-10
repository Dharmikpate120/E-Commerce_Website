const validator = require("validator");

function validateEmail(email) {
  return validator.isEmail(email);
}
function validateString(str) {
  return /^[a-zA-Z0-9 ]+$/.test(str) ? true : false;
}
function validateStringArray(Sarr) {
  var res = true;
  Sarr.forEach((str) => {
    if (!/^[a-zA-Z0-9 ]+$/.test(str)) {
      res = false;
      return;
    }
  });
  return res;
}
function validateAddress(str) {
  return /^[a-zA-Z0-9 ,-]+$/.test(str) ? true : false;
}
function validateNumber(str) {
  // console.log(typeof str);
  // console.log(/^\d+$/.test(str), str, "hello");
  return /^\d+$/.test(str);
}
function validateUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}
function validateBoolean(bool) {
  return booleanConverter(bool) === true || booleanConverter(bool) === false
    ? true
    : false;
}
function booleanConverter(bool) {
  if (bool === "true") {
    return true;
  } else if (bool === "false") {
    return false;
  }
}
module.exports = {
  validateEmail,
  validateString,
  validateStringArray,
  validateAddress,
  validateNumber,
  validateUrl,
  validateBoolean,
};
