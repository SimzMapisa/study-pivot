import { Country, State } from "country-state-city";
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  surname: {
    type: String,
    trim: true,
    required: "surname is required",
  },
  username: {
    type: String,
    trim: true,
    required: "username is required",
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Email is required",
  },
  userType: {
    type: String,
    required: "Select either student or tutor",
    enum: ["student", "tutor"],
  },
  dob: {
    type: Date,
    required: "Please provide your date of birth",
  },
  gender: {
    type: String,
    required: "Please provide your gender",
  },
  phone: {
    type: String,
    required: "Please provide your phone number",
    validate: {
      validator: function (v) {
        // Example regex for a simple phone number validation
        return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  country: {
    type: String,
    required: "Please select your country",
  },
  state: {
    type: String,
    required: function () {
      const countries = Country.getAllCountries();
      const isValidCountry = countries.some((c) => c.isoCode === this.country);
      if (!isValidCountry) return false;

      const states = State.getStatesOfCountry(this.country);
      return states.length > 0;
    },
    message: "State is required for selected country",
  },
  school: {
    type: String,
    required: function () {
      return this.userType === "student";
    },
    message: "School is required for students",
  },
  languages: {
    type: String,
    required: function () {
      return this.userType === "tutor";
    },
    message: "Languages are required for tutors",
  },
  avatar: {
    type: String,
  },
  profilecompleted: {
    type: Boolean,
    default: false,
  },
});

const friendshipSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  friend: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["accepted", "rejected"],
    default: "accepted",
  },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
export const Friend = mongoose.model("Friendship", friendshipSchema);

// module.exports = {User, Friend}
