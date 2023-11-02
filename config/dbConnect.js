const { default: mongoose } = require('mongoose');

const dbConnet = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/hrManagement');
    console.log('MongoDB connected');
  } catch (err) {
    console.error(`An error occured, ${err}`);
  }
};

dbConnet()
