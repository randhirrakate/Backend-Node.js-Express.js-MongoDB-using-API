var express = require("express");
var router = express.Router();
const { check } = require("express-validator");

const { register } = require("../controller/userController");
const { login } = require("../controller/userController");
const { getAllUser } = require("../controller/userController");
const { getUserById } = require("../controller/userController");
const { getUser } = require("../controller/userController");
const { removeUser } = require("../controller/userController");
const { updateUser } = require("../controller/userController");


//Register User
router.post("/register",    // http://localhost:3100/api/register
[
    check("name", "Name should be at least 3 char").isLength({ min: 3 }), // form validation
    check("email", "Your entered wrong email ").isEmail(),  // check  email validation
    check("password", "Password should be at least 3 char").isLength({ min: 3 }),  // check  password validation
],
  register
);


//Login User
router.post("/login",         // http://localhost:3100/api/login
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 3 })
  ],
  login
);


//GetAllUser
router.get("/user/getallusers/",getAllUser); // http://localhost:3100/api/user/getallusers

router.param("userId", getUserById); // param : parameter

//Find UserById
router.get("/user/:userId", getUser)  // http://localhost:3100/api/user/userId

//Remove User
router.delete("/removeuser/:userId",removeUser); // http://localhost:3100/api/removeuser/userId

//Update User 
router.put("/updateuser/:userId", updateUser); // http://localhost:3100/api/updateuser/userId


module.exports = router;