const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = {
  register: async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    
    if (user !== null) return res.status(500).json({errors:{email:{message: "Email already in use."}}});
    else {  
      User.create(req.body)
        .then(user => {
          const userToken = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: "24h"});
          res.cookie("usertoken", userToken, {httpOnly: true}).json({ info: {userId:user._id, userName: user.name} });
        })
        .catch(err => res.status(400).json(err));
    }
  },

  login: async(req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if(user === null) return res.status(500).json({error:"Invalid email address."});

    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if(!correctPassword) return res.status(500).json({error:"Password doesn't match."});

    const userToken = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: "24h"});

    res.cookie("usertoken", userToken, {httpOnly: true}).json({ info: {userId:user._id, userName: user.name} });
  },

  logout: (req, res) => {
    res.cookie("usertoken", "", {maxAge: 1})
    res.sendStatus(200);
  },
}