const mongoose = require('mongoose');
const employeeId = require('../middlewares/employeeNo');

const hrSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Admin',
    //   required: true,
    // },
    dateEmployed: {
      type: String,
      default: new Date().toDateString(),
      required: true,
    },
    employeeNumber: {
      type: String,
      unique: true,
    },
    isOnleave: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    isLaidOff: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

hrSchema.pre('save', async function (next) {
  if (!this.employeeNumber) {
    this.employeeNumber = await employeeId(HR, this.dateEmployed);
  }
  next();
});

const HR = mongoose.model('HR', hrSchema);

module.exports = HR;
