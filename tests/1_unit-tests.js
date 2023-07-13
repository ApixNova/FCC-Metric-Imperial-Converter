const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  // tests on numbers:
  test("whole number input", function () {
    assert.equal(5, convertHandler.getNum("5"));
  });
  test("decimal number input", function () {
    assert.equal(5.5, convertHandler.getNum("5.5"));
  });
  test("fractional input", function () {
    assert.equal(1 / 2, convertHandler.getNum("1/2"));
  });
  test("fractional input with decimal", function () {
    assert.equal(1.2 / 3, convertHandler.getNum("1.2/3"));
  });
  test("return error on double-fraction", function () {
    assert.equal("error", convertHandler.getNum("3/3/2"));
  });
  test("default to a numerical input of 1 when no numerical input is provided", function () {
    assert.equal(1, convertHandler.getNum("number"));
  });
  //tests on units:
  test("read each valid input unit", function () {
    assert.equal("gal", convertHandler.getUnit("5gal"));
    assert.equal("L", convertHandler.getUnit("5l"));
    assert.equal("mi", convertHandler.getUnit("5mi"));
    assert.equal("km", convertHandler.getUnit("5km"));
    assert.equal("lbs", convertHandler.getUnit("5Lbs"));
    assert.equal("kg", convertHandler.getUnit("5kg"));
  });
  test("return an error for an invalid input unit", function () {
    assert.equal("error", convertHandler.getUnit("5gap"));
  });
  test("return the correct return unit for each valid input unit", function () {
    assert.equal("L", convertHandler.getReturnUnit("gal"));
    assert.equal("gal", convertHandler.getReturnUnit("L"));
    assert.equal("mi", convertHandler.getReturnUnit("km"));
    assert.equal("km", convertHandler.getReturnUnit("mi"));
    assert.equal("lbs", convertHandler.getReturnUnit("kg"));
    assert.equal("kg", convertHandler.getReturnUnit("lbs"));
  });
  test("return the spelled-out string unit for each valid input unit", function () {
    assert.equal("gallons", convertHandler.spellOutUnit("gal"));
    assert.equal("liters", convertHandler.spellOutUnit("L"));
    assert.equal("miles", convertHandler.spellOutUnit("mi"));
    assert.equal("kilometers", convertHandler.spellOutUnit("km"));
    assert.equal("pounds", convertHandler.spellOutUnit("lbs"));
    assert.equal("kilograms", convertHandler.spellOutUnit("kg"));
  });
  // tests on conversion
  test("correctly convert gal to L", function () {
    assert.equal("3.78541", convertHandler.convert(1, "gal"));
  });
  test("correctly convert L to gal", function () {
    assert.equal("0.26417", convertHandler.convert(1, "L"));
  });
  test("correctly convert mi to km", function () {
    assert.equal("1.60934", convertHandler.convert(1, "mi"));
  });
  test("correctly convert km to mi", function () {
    assert.equal("0.62137", convertHandler.convert(1, "km"));
  });
  test("correctly convert lbs to kg", function () {
    assert.equal("0.45359", convertHandler.convert(1, "lbs"));
  });
  test("correctly convert kg to lbs", function () {
    assert.equal("2.20462", convertHandler.convert(1, "kg"));
  });
});
