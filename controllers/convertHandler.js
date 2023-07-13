function ConvertHandler() {
  // All of those in both ways:

  // km to mile
  // gallon to liter
  // kg to lbs
  this.getNum = function (input) {
    let regex =
      /^\d+(?=[A-Za-z]*$)|^\d+[.]\d+(?=[A-Za-z]*$)|^\d+[\/]\d+(?=[A-Za-z]*$)|^\d+[.]\d+[\/]\d+(?=[A-Za-z]*$)|^\d+[\/]\d+[.]\d+(?=[A-Za-z]*$)|^\d+[.]\d+[\/]\d+[.]\d+(?=[A-Za-z]*$)/;
    let result = input.toString().match(regex);
    let fractionNum = input.toString().match(/[/]/g);
    if (fractionNum?.length >= 2) return "error";
    if (result == undefined) return 1;
    if (fractionNum)
      return result[0].match(/^.+(?=[\/])/) / result[0].match(/(?<=[\/]).*/);
    return result;
  };

  this.getUnit = function (input) {
    let regex = /[A-Za-z]+$/i;
    let result = input.toString().match(regex)[0];
    let validUnits = ["l", "gal", "mi", "km", "lbs", "kg"];
    if (!validUnits.includes(result.toLowerCase())) return "error";
    result = result.toLowerCase();
    return result == "l" ? "L" : result;
  };

  this.getReturnUnit = function (initUnit) {
    let units = ["L", "gal", "mi", "km", "lbs", "kg"];
    let unitsConverted = ["gal", "L", "km", "mi", "kg", "lbs"];
    let result = unitsConverted[units.indexOf(initUnit)];
    return result;
  };

  this.spellOutUnit = function (unit) {
    let units = ["L", "gal", "mi", "km", "lbs", "kg"];
    let unitsSpelledOut = [
      "liters",
      "gallons",
      "miles",
      "kilometers",
      "pounds",
      "kilograms",
    ];
    let result = unitsSpelledOut[units.indexOf(unit)];
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case "L":
        return (initNum / galToL).toFixed(5);
      case "gal":
        return (initNum * galToL).toFixed(5);
      case "lbs":
        return (initNum * lbsToKg).toFixed(5);
      case "kg":
        return (initNum / lbsToKg).toFixed(5);
      case "mi":
        return (initNum * miToKm).toFixed(5);
      case "km":
        return (initNum / miToKm).toFixed(5);
    }
    return "error";
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result =
      initNum +
      " " +
      this.spellOutUnit(initUnit) +
      " converts to " +
      returnNum +
      " " +
      this.spellOutUnit(returnUnit);
    return result;
  };
}

module.exports = ConvertHandler;
