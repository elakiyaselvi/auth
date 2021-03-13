const db = require("../../config/dbconnections");
express = require("express");
var path = require("path");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

function getStandardResponse(status, message) {
  return {
    response_code: status,
    response_message: message,
  };
}
function getUserDetails(Userobj) {
  userDetails = {
    userid: Userobj.id,
    name: Userobj.name,
    email: Userobj.email,
    phonenumber: Userobj.phonenumber,
  };
  return userDetails;
}
async function verifyUser(password, passHash) {
  bcrypt.compare(password, passHash, function (err, result) {
    return result;
  });
}
function GetAccessToken(userid) {
  const refreshToken = jwt.sign({ sub: userid }, config.refreshTokenSecret, {
    expiresIn: config.RefExpiresIn,
  });
  const token = jwt.sign({ sub: userid }, config.secret, {
    expiresIn: config.AccExipresIn,
  });
  const response = {
    response_code: 200,
    response_message: "Success",
    id: userid,
    accessToken: token,
    refreshToken: refreshToken,
  };
  return response;
}
module.exports = {
  getStandardResponse,
  getUserDetails,
  verifyUser,
  GetAccessToken,
};
