const passport = require('passport');

exports.registerUser = async (userModel, req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  // Check if any model with the email exist
  const existingUser = await userModel.findOne({ email: email });
  if (existingUser) {
    throw new Error('User with email exist');
  }

  const newUser = { firstname: firstname, lastname: lastname, email: email };

  // Register the user and authenticate
  userModel.register(newUser, password, (err, registeredUser) => {
    if (err) {
      res.status(200).json({ status: 'Failed', data: err.message });
    } else {
      passport.authenticate('local')(req, res, () => {
        console.log('User Registered and authenticated');
        res.redirect(
          `/api/v1/${registeredUser.role}/dashboard/${registeredUser._id}`
        );
      });
    }
  });
};

exports.loginUser = async (userModel, req, res, next) => {
  const { email, password } = req.body;

  // Check if any model with the email has being registered
  const existingUser = await userModel.findOne({ email: email });
  console.log(!existingUser);
  if (!existingUser) {
    throw new Error("User with the given email doesn't exist");
  }

  const user = new userModel({
    email: email,
    password: password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('Logged in');
      passport.authenticate('local')(req, res, () => {
        res.send('/secrets');
        console.log('logged in and authorized');
      });
    }
  });
};
