const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

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

    password: String,

    role: {
      type: String,
      default: 'hrs',
      required: true,
    },

    employee: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
      },
    ],

    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

hrSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const HR = mongoose.model('HR', hrSchema);

module.exports = HR;
