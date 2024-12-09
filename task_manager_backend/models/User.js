import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

const salt = await bcrypt.genSalt(10);

userSchema.methods.matchPasswords = async function (enteredPassword) {
  console.log(await bcrypt.hash(enteredPassword, salt));
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function () {
  if (!this.isModified) {
    next();
  }

  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
