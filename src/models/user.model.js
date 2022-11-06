const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone_number: {
      type: String
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSaltSync(11);
    const hashed = await bcrypt.hashSync(this.password, salt);
    this.password = hashed;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};

UserSchema.methods.comparePassword = async function (password, next) {
  try {
    const isMatch = await bcrypt.compareSync(password, this.password);
    return isMatch;
  } catch (error) {
    next(error);
  }
};


module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
