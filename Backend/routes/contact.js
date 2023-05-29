const express = require('express');
const router = express.Router();



const {getcontactus, postcontactus, contUs} = require("../controllers/contact-me");

router.route('/').get(getcontactus).post(postcontactus)

router.route("/:id").delete( contUs);
module.exports=router;
