const express = require("express");
const Router = express.Router;
const { adminModel } = require("./../db");
const jwt = require("jsonwebtoken");
const JWT_ADMIN_SEC="t-f6Va9!k*@v1k$UrFV_0JsQ1H%x43DMl!0&amp;"
const bcrypt = require("bcrypt");

const adminRouter = Router();
//adminRouter.use(adminMiddleware);

adminRouter.get("/login", async(req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    let admin = await adminModel.findOne({
        email: email
    })
    if(!admin){
        res.json({
            msg: "WHO ARE YOU"
        })
    }
    const passwordcheck = bcrypt.compare(password, admin.password);
    if(passwordcheck){
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_SEC);
    res.json({
        msg: "admin logged in",
        token: token
    })}else{
        res.status(403).json({
            msg: "Who are you"
        })
    }
})

adminRouter.post("/register", async(req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    try{
    await adminModel.create({ 
        email: email,
        password: bcrypt.hash(password, 10)
    })}catch(e){} //Rabitholes
    res.json({
        msg: "ADMIN REG SUCCESS"
    })
})


module.exports = {
    adminRouter: adminRouter
}