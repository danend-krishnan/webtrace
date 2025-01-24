const express = require("express");
const Router = express.Router;
const { adminModel } = require("./../db");
const jwt = require("jsonwebtoken");
const JWT_ADMIN_SEC="t-f6Va9!k*@v1k$UrFV_0JsQ1H%x43DMl!0&amp;"
const bcrypt = require("bcrypt");
 
async function adminMiddleware(req, res, next)
{
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
    if(admin){const passwordcheck = await bcrypt.compare(password, admin.password);
    if(passwordcheck){
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_SEC);
        req.userId=token.id;
        req.token=token;
    next();
    }if(!passwordcheck){
        res.status(403).json({
            msg: "Who are you"
        })
    }}
}

module.exports = {
    adminMiddleware: adminMiddleware
}