const express = require('express');
const {
  createHR,
  getHR,
  loginHR,
  getDashboard,
  logout,
} = require('../controller/hrController');

const hrRouter = express.Router();

// get hr login page
// hrRouter.get('/', getHR)

// register an hr
hrRouter.post('/register', createHR);
hrRouter.get('/dashboard/:id', getDashboard);

// login an hr
hrRouter.post('/login', loginHR);

// logou an hr
hrRouter.post('/logout', logout);

// // hr hires a new employee
// hrRouter.put('/hires/employee/', createHR);

// // hr suspend an employee
// hrRouter.put('/suspend/employee/:id', createHR);

// // hr unsuspend an employee
// hrRouter.put('/unsuspend/employee/:id', createHR);

// // hr laid off an employee
// hrRouter.put('/withdraw/employee/:id', createHR);

// // hr callbacks laid off  employee
// hrRouter.put('/unwithdraw/employee/:id', createHR);

// // hr suspend an employee
// hrRouter.put('/suspend/employee/:id', createHR);

// // HR grants leave to an employee
// hrRouter.put('/grant/leave/:id', createHR);

// // HR revokes or cancels approved leave for an employee
// hrRouter.put('/revoke/leave/:id', createHR);

hrRouter;

module.exports = hrRouter;
