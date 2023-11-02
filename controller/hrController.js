const HR = require('../model/hrSchema');

exports.createHR = async (req, res) => {
    // console.log(req);
  const {
    firstname,
    lastname,
    email,
    department,
    position,
    birthdate,
    address,
    phone,
  } = req.body;

  const birthDate = new Date(birthdate).toLocaleDateString();

  // Check if exist
  const hrFound = await HR.findOne({ email });
  if (hrFound) {
    throw new Error('Admin Exist');
  }
  const newHR = await HR.create({
    firstname,
    lastname,
    email,
    department,
    position,
    birthDate,
    address,
    phone,
  });
  res.status(201).json({ status: 'Success', data: newHR });
}

exports.getHR = (req, res) => {
    console.log('Here I am');
}

