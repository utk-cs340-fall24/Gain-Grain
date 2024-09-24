require('dotenv').config();
const bcrypt = require('bcryptjs');
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error', err));

const userSchema = new mongoose.Schema ({
  name: { type: String, required: true},
  username: { type: String, required: true},
  password: { type: String, required: true}
});

let User = mongoose.model("User", userSchema)

const createAndSaveUser = (name, username, password, done) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if(err) return done(err);

    var newUser = new User({
      name: name,
      username: username,
      password: hashedPassword
    });

    newUser.save()
    .then(data => {
      if(done) done(null, data);
    })
    .catch(err => {
      console.error(err);
      if(done) done(err);
    });
  });
};

const findUser = async (username, password, res) => {
  try {
    const userFound = await User.findOne({ "username": username })

    if(!userFound) {
      return { success: false, message: "Username or password is incorrect." };
    }

    const isMatch = await bcrypt.compare(password, userFound.password)

    if(!isMatch) {
      return { success: false, message: "Username or password is incorrect." };
    }

    return { success: true, user: userFound};
  } catch (err) {
    res.send("Error finding user: " + err);
    return { success: false, message: "Server error." };
  }
};

exports.UserModel = User;
exports.createAndSaveUser = createAndSaveUser;
exports.findUser = findUser;