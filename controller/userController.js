
const asyncHandler = require('express-async-handler'); 
const User = require('../models/userModel'); 
const { get } = require('mongoose');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

//@desc Register a User
//@route POST /api/users/register 
//@acess public 
const registerUser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body; 
    if(!username || !password || !email){
        res.status(400); 
        throw new Error("All fields are mandatory")
    }
    
    const userAvailable = await User.findOne({ email });
    if(userAvailable){
        res.status(400); 
        throw new Error("User already registered")
    }
     
    //Hash password 

    const hashedPassword= await bcrypt.hash(password, 10)
    console.log("Hashed Password ", hashedPassword)
    const user = await User.create({
        username,
        email,
        password: hashedPassword, 
    })
    console.log(`User created ${user}`); 
    if (user) {
        res.status(201).json({_id: user.id, email: user.email })
    } else {
        res.status(404); 
        throw new Error("user data is not valid")
    }


    res.status(200).json(); 
    
})

//@desc login  a User
//@route POST /api/users/login 
//@acess public 
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body; 
    if(!email || !password){
        res.status(400); 
        throw new Error("All fields are mandatory"); 
    }
    const user = await User.findOne({ email });
    // compare password with hashedpassword 
    if(user && (await bcrypt.compare(password, user.password))) {

        //create the access token 
        const accessToken = jwt.sign({
            user:{
                username:user.username, 
                email: user.email, 
                id: user.id, 
            }, 
            //add the jwt access secret token and expiration time of 1min 
        }, process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "15m" }
        ); 
        res.status(200).json({ accessToken }); // respond with the acesstoken 
    } else {
        res.status(401)
        throw new Error("email or password is not valid"); 
    }; 
}); 
 
//@desc create user 
//@route POST /api/users/current 
//@acess private

const createUser = asyncHandler(async  (req, res) => {
    
    res.json(req.user)
    throw new Error('user not created')
}); 











module.exports = { registerUser, 
                loginUser, 
                createUser, 
                }; 