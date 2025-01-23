const express = require("express");
const Router = express.Router;

const adminRouter = Router();
adminRouter.use(adminMiddleware);

adminRouter.get("/login", (req, res)=>{
    res.json({
        msg: "admin"
    })
})

adminRouter.post("/register", (req, res)=>{
    
})

module.exports = {
    adminRouter: adminRouter
}