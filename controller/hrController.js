const AsyncHandler = require('express-async-handler');
const HR = require('../model/hrSchema');
const { registerUser, loginUser } = require('../utils/user');

// @desc Register HR
// @route POST /api/hrs/register
// @access Private
exports.createHR = AsyncHandler(async (req, res, next) => {
  await registerUser(HR, req, res, next);
});

// @desc Login HR
// @route POST /api/hrs/login
// @access Private
exports.loginHR = AsyncHandler(async (req, res, next) => {
  await loginUser(HR, req, res, next);
});

exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
};

// @desc Get HR Dashboard
// @route GET /api/hrs/dashboard/:id
// @access Private
exports.getDashboard = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  if (req.isAuthenticated()) {
    // Access user details
    await HR.findById(id)
      .exec()
      .then((user) => {
        if (user.email === req.session.passport.user) {
          res.status(200).json({
            status: 'Success',
            data: user,
          });
        } else {
          throw new Error('Unauthorized');
        }
      });
  } else {
    throw new Error('Unauthorized');
  }
});
