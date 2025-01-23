
const mongoose = require("mongoose");
mongoose.connect("")
const Schema = mongoose.Schema;
const ObjectId = mongoose.mongo.type.ObjectId;

const adminSchema = Schema({
    email: {type:String, unique:true},
    password: String
});

const adminModel = mongoose.Model("admin", adminSchema)

module.exports = {
    adminModel: adminModel
}