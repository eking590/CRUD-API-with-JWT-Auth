const express = require('express'); 
const router = express.Router(); 
const { getContact, 
        getContactFor, 
        createContact,
        updateContact, 
        deleteContact } = require('../controller/contactController');
const validateToken = require('../middleware/validateToken');



router.use(validateToken); 

router.route("/",).get(getContact).post(createContact); 

router.route("/:id",).get(getContactFor).put(updateContact).delete(deleteContact);




module.exports=router; 