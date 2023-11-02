const employeeId = async (model, employee) => {
  const year = employee.split(' ')[3];
  const count = await model.countDocuments();
  const employeeNumber = `${year[2] + year[3]}/27EMP/${(count + 1)
    .toString()
    .padStart(4, '0')}`;

  return employeeNumber;
};

module.exports = employeeId