require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema ({
  name: { type: String, required: true},
  username: { type: String, required: true},
  password: { type: String, required: true}
});

let User = mongoose.model("User", userSchema)

const createAndSaveUser = (done) => {
  var firstUser = new User({
    name: "Ethan Crall",
    username: "ecrall",
    password: "cs340-g&g-test"
  });
  firstUser.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findUser = (userName, userUsername, userPassword, done) => {
  Person.find({"name": userName, "username": userUsername, "password": userPassword}, function(err, personFound) {
    if(err) return console.log(err);
    done(null, personFound)
  })
};

exports.UserModel = User;
exports.createAndSaveUser = createAndSaveUser;
exports.findUser = findUser;