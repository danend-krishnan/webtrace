const express = require("express");
const Router = express.Router;

const adminRouter = Router();

adminRouter.get("/login", (req, res)=>{
    res.json({
        msg: "admin"
    })
})

module.exports = {
    adminRouter: adminRouter
}