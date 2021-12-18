const isValid = (val) => {
  // check to see if the value is undefined or null first
  if (typeof val === "undefined") {
    return false;
  }
  if (val === null) {
    return false;
  }

  // then check to see if its a string and if it is, then it needs a length
  if (typeof val === "string" && val.length === 0) {
    return false;
  }

  // check to see if the value is an object. if it is, then it needs to have keys
  if (typeof val === "object") {
    if (Object.keys(val).length === 0) {
      return false;
    }
  }

  return true;
};

module.exports = { isValid };
