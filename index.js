const express = require("express");
const app = express();
const {adminRouter} = require("./routes/adminroutes")

app.use("/admin", adminRouter);

app.listen(3000);
