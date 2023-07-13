"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  // Let's go!!

  app.route("/api/convert").get(function (req, res) {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    // If error display error
    if (initNum == "error" && initUnit == "error") {
      res.json("invalid number and unit");
    } else if (initNum == "error") {
      res.json("invalid number");
    } else if (initUnit == "error") {
      res.json("invalid unit");
    } else {
      let returnNum = convertHandler.convert(initNum * 1, initUnit) * 1;
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let string = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );
      initNum *= 1;
      if (initUnit == "l") {
        initUnit = "L";
      }
      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string,
      });
    }
  });
};
