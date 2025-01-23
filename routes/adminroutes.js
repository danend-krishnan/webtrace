const express = require("express");
const Router = express.Router;
const { adminModel } = require("./../db")

const adminRouter = Router();
// adminRouter.use(adminMiddleware);

adminRouter.get("/login", (req, res)=>{
    res.json({
        msg: "admin"
    })
})

adminRouter.post("/register", async(req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    await adminModel.create({ 
        email: email,
        password: password
    })
    res.json({
        msg: "ADMIN REG SUCCESS"
    })
})

module.exports = {
    adminRouter: adminRouter
}