import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const formSubmissionSchema = mongoose.Schema({
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  major: {
    type: String,
  },
  experience: {
    type: Number,
  },
});

// example purpose :
const otherInfoSchema = mongoose.Schema({
  field1: {
    type: String,
  },
  field2: {
    type: String,
  },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    doctorInfo: {
      type: [
        {
          formSubmission: formSubmissionSchema,
          otherInfo: otherInfoSchema,
        },
      ],
      default: [],
    },
    userInfo: [],
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10mins

  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
