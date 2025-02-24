const express = require("express");
const Router = express.Router;
const { adminModel } = require("./../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {z} = require("zod");
const {adminMiddleware} = require("./../middlewares/adminMiddleware");
const JWT_ADMIN_SEC="t-f6Va9!k*@v1k$UrFV_0JsQ1H%x43DMl!0&amp;"
const {monitor} = require("./../test")

// const insta = require("instagram-web-api")

let responsevalue;
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
    const requiredBody = z.object({
        email: z.string().max(30).min(2).email(),
        password: z.string().max(32).min(6)
    });
    const parsedBody = requiredBody.safeParse(req.body);

    if(!parsedBody.success){
        return res.json({
            message: "Incorrect format"
        });
    }

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


adminRouter.get("/monitoring", adminMiddleware, async(req, res)=>{
    const instaid = req.body.instaid;
    console.log(instaid);
    checktoken = req.body.token;
    try{token = jwt.verify(checktoken, JWT_ADMIN_SEC);}
    catch(e){};
    if(token){
    const value = await monitor(instaid);
    console.log(value)
        if (value){
    res.json({
        msg: "MONITORING STARTED ",
        words: value[0],
        postulr: value[1]
    });
}}
    else{
        res.json({
            msg: "Who are you"
        })
    }
})
   async function responsecall(profileName){
        responsevalue = profileName;
        return responsevalue;
    }

// async function searchAccount(username) {
//     const client = new insta(credentials);
//     try {
//         await client.login();
//         const user = await client.getUserByUsername({ 
//             username: username
//          });
//         console.log("User Details:", user);
//     } catch (error) {
//         console.error("An error occurred:", error.message);
//     }
// }

module.exports = {
    adminRouter, responsecall
}