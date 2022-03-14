module.exports = app => {
    const requests = require("../controllers/requests.controller.js");
    let router = require("express").Router();

    router.get("/", requests.getAll);
};