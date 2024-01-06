// const Joi = require('joi');
const express = require("express");
const { AdminSignup,Adminlogin, getUser, update, remove } = require("../controller/admin");
const isAdmin = require("../middlewares/isAdmin")
const router = express.Router();



router.post("/admin/signup",AdminSignup);
router.post("/admin/login",Adminlogin);
router.get("/getuser",isAdmin,getUser);
router.put("/edituser/:id",isAdmin,update);
router.delete("/deleteuser/:id",isAdmin,remove);

module.exports = router;