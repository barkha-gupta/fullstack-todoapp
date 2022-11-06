const express= require("express");
const app= express();
const dotenv= require("dotenv");
const mongoose= require("mongoose");
const bodyparser= require("body-parser");
const { urlencoded } = require("body-parser");
const User= require("./models/user")
const jwt= require("jsonwebtoken");
const cors= require("cors");
const unprotectedRoutes= ["/register" , "/login"];
const Todo= require("./models/todo");

dotenv.config();
app.use(express.json());
app.use(bodyparser(urlencoded({extended:false})));
app.use(cors())

const PORT= process.env.PORT || 8000;
const MONGO_URI= process.env.MONGO_URI;
const SECRET_KEY= process.env.SECRET_KEY;
mongoose.connect(MONGO_URI).then(()=>{
    console.log("connected to database");
}).catch((e)=>{
    console.log(e);
});

//============================================ verify 
app.use((req, res, next)=>{
    if(unprotectedRoutes.includes(req.url)){
        next();
    }
    else{
        const token= req.headers.authorization;
        // console.log(token);
        if(!token)
        {
            return res.status(401).json({
                message: "User not logged in!"
            })
        }
        else{
            try {
                const decode= jwt.verify(token, SECRET_KEY);
                // console.log(decode);
                req.user= decode.data; //email
                next();
            } catch (error) {
                res.status(400).json({
                    status: "Bad Request",
                    message: error.message
                })
            }
        }
    }
})

//=============================================
app.post("/register", async (req, res) => {
    try {
    const { email, password, cpassword } = req.body;
    const emailRegax = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(emailRegax)) {
        return res.status(401).json({
            message: "Enter valid email"
        })
    }
    
    const data = await User.findOne({ email: email });
    if(data) {
        res.status(401).json({
            message: "User Already Registered!"
        })
    }
    else {
        const data = await User.create({
            email, password
        })
        res.status(200).json({
            message: "User Registered!",
            data
        })
    }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
    
})
// ================================

app.post("/login", async(req, res)=>{
    try {
    const {email, password}= req.body;
    const emailRegax = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(emailRegax)) {
        return res.status(401).json({
            message: "Enter valid email"
        })
    }
 
    const user= await User.findOne({email: email});
    if(!user){
        return res.status(401).json({
            message: "User is not registered"
        }) 
    }
    else{
        if(user.password !== password)
        {
            return res.status(401).json({
                message: "Enter the correct password"
            }) 
        }
        const token= jwt.sign({
            data: user.email
        }, SECRET_KEY);
        return res.status(200).json({
            message: "User Login Successful!",
            token
        })
    }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
    
})
// ========================================
app.get("/username", async(req, res)=>{
    const data = await User.findOne({ email: req.user });
    res.json(data);
})
//==========================================
// app.get("/todos", (req, res)=>{
//     res.status(200).json({
//         message: "inside username"
//     }); 
// })
//==========================================
app.post("/todo", async(req, res)=>{
    try {
        const todo= await Todo.create({
            activity: req.body.activity,
            user: req.user
        })
        return res.status(200).json({
            message: "Todo created",
            todo
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
    

})
//==========================================

app.get("/", (req, res)=>{
    res.send("SERVER STARTED")
})

app.get("*", (req,res) => {
    res.status(400).json({
        message: "Api not found"
    }); 
})

app.listen(PORT, console.log(`Server starting at ${PORT}`));
