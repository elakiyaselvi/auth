const { response } = require("express");
const db = require("../../config/dbconnections");
const User = db.User;
const CF = require("../commonclass/helper");
express = require("express");

module.exports = {
  add: (req, res, next) => {
    const userreg = new User(req.body);
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then(function (user) {
        if (user) {
          var response = CF.getStandardResponse(201, "Email already used.");
          return res.status(201).send(response);
        } else {
          userreg.save().then((data) => {
            var response = CF.getStandardResponse(201, "Created successfully.");
            return res.status(201).send(response);
          });
        }
      })
      .catch(next);
  },
  show: (req, res, next) => {
    User.findOne({
      where: {
        id: req.params.userid,
      },
    })
      .then(function (user) {
        if (user) {
          const UserDetails = CF.getUserDetails(user);
          const response = {
            response_code: "200",
            response_message: "success",
            data: { ...UserDetails },
          };
          res.status(200).send(response);
        } else {
          var response = CF.getStandardResponse(
            500,
            "No user exist for this id"
          );
          return res.status(500).send(response);
        }
      })
      .catch(next);
  },
  login: (req, res, next) => {
    let status = 200;
    let response = {};
    if (!req.body.email) {
      status = 201;
      response = CF.getStandardResponse(201, "No email");
    }
    if (!req.body.password) {
      status = 201;
      response = CF.getStandardResponse(201, "No Password");
    }
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          status = 201;
          message = "Email id not registered with us";
          response = CF.getStandardResponse(status, message);
        } else {
          Isverified = CF.verifyUser(req.body.password, user.password);
          if (Isverified) {
            response = CF.GetAccessToken(user.id);
          } else {
            status = 201;
            message = "Invalid password";
            response = CF.getStandardResponse(status, message);
          }
        }
        res.status(status).send(response);
      })
      .catch(next);
  },
};
