"use strict";

var multer = require("multer");

// Define storage for uploaded files
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split('.').pop());
  }
});

// Create instance of Multer with storage configuration
var upload = multer({
  storage: storage
});

module.exports = upload;