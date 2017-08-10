const jwt = require('jsonwebtoken');
const {User} = require('../models/users');

module.exports.AuthenticateUser = function(req,res,next){
  var token = req.query.token;

  try{
    var decoded = jwt.verify(token, 'somesecret');
    User.getDepartment(decoded._id).then((department)=>{
      req.body.department = department;
      console.log(req.body.department);
      next();
    });
  } catch(err){
    res.status(401).send({msg: 'UNAUTHORIZED', status : 401});
  }
};
