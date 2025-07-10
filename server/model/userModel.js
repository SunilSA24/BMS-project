const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Pre-Save hook
userSchema.pre("save", function(next) {
    console.log("pre-save hook", this);
    const now = new Date();
    this.updatedAt = now;
    if(!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

// Post-save hook
userSchema.post("save", function(document, next) {
    console.log(`User ${document} has been saved`);
    next();
})

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;

