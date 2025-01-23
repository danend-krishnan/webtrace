const express = require("express");
const Router = express.Router;
const { adminModel } = require("./../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {adminMiddleware} = require("./../middlewares/adminMiddleware");
const insta = require("instagram-web-api")

const credentials = {
    username: "Webtrace_og",
    password: "dan@1234"
};


const adminRouter = Router();
//adminRouter.use(adminMiddleware);

adminRouter.get("/login", adminMiddleware, async(req, res)=>{
    // const email = req.body.email;
    // const password = req.body.password;
    // let admin = await adminModel.findOne({
    //     email: email
    // })
    // if(!admin){
    //     res.json({
    //         msg: "WHO ARE YOU"
    //     })
    // }
    // const passwordcheck = bcrypt.compare(password, admin.password);
    // if(passwordcheck){
    //     const token = jwt.sign({
    //         id: admin._id
    //     }, JWT_ADMIN_SEC);
    // res.json({
    //     msg: "admin logged in",
    //     token: token
    // })}else{
    //     res.status(403).json({
    //         msg: "Who are you"
    //     })
    // }
    res.json({
        msg: "WELCOME ADMIN",
        token: req.token
    });
});

adminRouter.post("/register", async(req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    try{
    await adminModel.create({ 
        email: email,
        password: await bcrypt.hash(password, 10)
    })}catch(e){} //Rabitholes
    res.json({
        msg: "ADMIN REG SUCCESS"
    })
})


adminRouter.get("/monitoring", async(req, res)=>{
    const instaid = req.body.instaid;
    console.log(instaid);
    // res.json({
    //     msg:instaid
    // })
    searchAccount(instaid);
})


async function searchAccount(username) {
    const client = new insta(credentials);
    try {
        await client.login();
        const user = await client.getUserByUsername({ 
            username: username
         });
        console.log("User Details:", user);
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

module.exports = {
    adminRouter: adminRouter
}