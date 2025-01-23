const express = require("express");
const app = express();
const {adminRouter} = require("./routes/adminroutes")
const mongoose = require("mongoose");


app.use("/admin", adminRouter);

async function main(){
await mongoose.connect("");
app.listen(3000);
}
main();