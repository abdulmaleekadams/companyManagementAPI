const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
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
    responsibilities: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HR',
      required: true,
    },
    dateEmployed: {
      type: String,
      default: new Date().toLocaleDateString(),
      required: true,
    },
    employmentStatus: {
      type: String,
      enum: ['contract', 'full-time'],
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

employeeSchema.pre('save', async function (next) {
  if (!this.employeeNumber) {
    const year = this.dateEmployed.split('/')[3];
    const Employee = mongoose.model('Employee', employeeSchema);
    const count = await Employee.countDocuments();
    this.employeeNumber = `${year[2] + year[3]}/EMP/${(count + 1)
      .toString()
      .padStart(4, '0')}`;
  }
  next();
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
