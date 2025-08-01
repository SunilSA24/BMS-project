const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  isActive: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const theaterModel = mongoose.model("theaters", theaterSchema);
module.exports = theaterModel;