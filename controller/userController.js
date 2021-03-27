const User = require("../model/userModel");
const { check, validationResult } = require("express-validator");
// var jwt = require("jsonwebtoken");
// var expressJwt = require("express-jwt");


exports.register = (req, res) => 
{
    const errors = validationResult(req);
  
    if (!errors.isEmpty())
     {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }

  
    const user = new User(req.body);
   
    user.save((err, userData) => 
    {
      
        if (err) 
      {
        return res.status(400).json({
          err: "NOT able to save user in DB"
        });
      }
      
      res.json({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        mobile: userData.mobile,
        address: userData.address,
        id: userData._id
      });
    });
  };


exports.login = (req, res) => 
{
    const { email, password } = req.body;
   
    User.findOne({ email }, (err, user) => 
    {
        if (err || !user) {
        return res.status(400).json({
        error: "USER email does not exists"
        });
    }
   
        if (!user.autheticate(password)) {
        return res.status(401).json({
        error: "Email and password do not match"
        });
    }

    const { _id, name, email } = user;
    return res.json({  user: { _id, name, email } });
    });
};
   

// to read all user
exports.getAllUser = (req, res) => 
{
  
  User.find().exec((err, userData) => 
  {
    if (err) {
      return res.status(400).json({
        error: "NO user found"
      });
    }

    res.json(userData);
  });
};

  //to find user
  exports.getUserById = (req, res, next, id) => 
   {
      User.findById(id) 
      .exec((err, userData) => 
          {
              if (err) {
              return res.status(400).json({
              error: "User not found"
          });
    }

    req.user = userData;  //global variable 

    next();
  
  });
};


//to find user byId
exports.getUser = (req, res) => 
{
    return res.json(req.user);
 
};


//to remove user byuserId
exports.removeUser = (req, res) =>
{
  const user = req.user;

   user.remove((err, user) => {
if (err) {
 return res.status(400).json({
   error: "Failed to delete this user"
 });
}
res.json({
 message: "Successfull deleted"

});
});
};


//to update user
exports.updateUser = (req, res) => 
{
   const user = req.user;
   user.name = req.body.name;
   user.email = req.body.email;
   user.password = req.body.password;
   user.mobile = req.body.mobile;
   user.address = req.body.address;
   user.purchases = req.body.purchases;
   

      user.save((err, updatedUser) => {
        if(err) {
          return res.status(400).json({
            error: "Failed to update user"
          });
        }
        res.json(updatedUser);
      });
   };