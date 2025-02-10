const express = require("express");
const app = express();
const {adminRouter} = require("./routes/adminroutes")
const mongoose = require("mongoose");

app.use(express.json())
app.use("/admin", adminRouter);

async function main(){
await mongoose.connect("mongodb+srv://webtrace:Sn6l5ATchttCCZuS@cluster0.vx69r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
app.listen(3001);
console.log("Nasty Connection Started")
}
main(); 