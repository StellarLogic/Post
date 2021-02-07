const bcrypt = require("bcrypt");

const run = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash("123", salt);
  console.log(hashedpassword);
};

run();
