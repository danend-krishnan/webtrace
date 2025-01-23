
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = Schema({
    email: {type:String, unique:true},
    password: String
});

const adminModel = mongoose.model("admin", adminSchema)

module.exports = {
    adminModel: adminModel
}