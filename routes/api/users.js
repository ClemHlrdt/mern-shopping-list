const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// User Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // simple validation
  if(!name || !email || !password){
    return res.status(400).json({ msg: 'Please enter all fields '});
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new User({
        name,
        email,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {

              jwt.sign(
                // payload: user id. A user will we identified by id
                { id: user.id },
                process.env.jwtSecret,
                { expiresIn: 3600 },
                (err, token) => {
                  if(err) throw err;
                  res.json({
                  token, 
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                  }
              });
                }
              )

              
            })
        })
      })
    })
    .catch(err => console.error(err))
});


module.exports = router;