const express = require("express");
const router = express.Router();
const contentful = require('../data/contentful-export-ie8hzkoeixts-master-2021-02-25T11-53-22.json')
const obj = contentful;

// TODO readfile and import needed fields

router.get("/", function(req, res, next) {
    res.send(obj);
});

module.exports = router;