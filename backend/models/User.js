const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please prvide an email"],
      uniqe: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
      country: { type: String },
    },
    phone: {
      type: String,
      match: [
        /^[0-9]{10,15}$/,
        "Phone number must be between 10 and 15 digits",
      ],
    },
  },
  {
    timestamps: true,
  }
);

// --- PRE-SAVE HOOK ---

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(error){
        next(error);
    }
});

// --- INSTANCE METHOD: Compare Password ---
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
};

// --- INSTANCE METHOD: Generate JWT ---
userSchema.methods.generateAuthToken = function(){
    const payload = {
        userId: this._id,
        role: this.role
    };
    const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE || '30d'}
    );
    return token;
}


// --- INSTANCE METHOD: toJSON (Sanitize Output) ---
// This method is called automatically when Express sends the response

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  // Remove sensitive stuff
  delete userObject.password;
  delete userObject.__v;

  return userObject;
};

// Create the model (name + schema)
const User = mongoose.model("User", userSchema);

module.exports = User;

