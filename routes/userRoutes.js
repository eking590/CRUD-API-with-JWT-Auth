const express = require('express'); 
const { registerUser, loginUser, createUser } = require('../controller/userController');
const validateToken = require('../middleware/validateToken');
const router = express.Router(); 


router.post("/register", registerUser)

router.post("/login",  loginUser)

router.get("/current", validateToken,  createUser)


module.exports=router; 