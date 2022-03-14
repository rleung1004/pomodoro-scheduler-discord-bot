module.exports = app => {
    const commitments = require("../controllers/commitment.controller.js");
    let router = require("express").Router();

    router.post("/", commitments.create);
    router.get("/", commitments.getAll);
};