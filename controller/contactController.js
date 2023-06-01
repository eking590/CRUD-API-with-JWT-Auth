
const asyncHandler = require('express-async-handler'); 
const Contact = require('../models/contactModel'); 
const { get } = require('mongoose');

//@desc Get all contacts 
//@route GET /api/contacts 
//@acess public 



const getContact = asyncHandler(async (req, res) => {
    const allContacts = await Contact.find({ user_id: req.user.id }); 
    if(!allContacts){
        res.status(404); 
        throw new Error("contacts not found")

    }
    res.status(200).json(allContacts); 
}); 

//@desc Get  contacts for one  
//@route GET /api/contacts/:id  
//@acess public 

const getContactFor = asyncHandler(async(req, res) => {
    const getContact = await Contact.findById(req.params.id); 
    if(!getContact){
        res.status(404); 
        throw new Error("contact not found")

    }
    res.status(200).json(getContact); 
}); 

//@desc create new  contacts 
//@route POST /api/contacts 
//@acess public 

const createContact = asyncHandler(async(req, res) => {
    const { name, email, Phone } = req.body;
    console.log(req.body)
    if (!name || !email || !Phone) {
        res.status(400); 
        throw new Error("All fields are mandatory"); 
    } 
    const contact = await Contact.create({ name, 
                                        email, 
                                        Phone,
                                        user_id: req.user.id }) ; 
    res.status(201).json(contact);  
}); 


//@desc update new  contacts 
//@route PUT /api/contacts 
//@acess public 

const updateContact = asyncHandler(async(req, res) => {
    const findContact = await Contact.findById(req.params.id); 
    if(!findContact){
        res.status(404); 
        throw new Error("contact with id not found")

    }
    if(findContact.user_id.toString() !== req.user.id){
        res.status(403); 
        throw new Error("User can't have permission to update other user contacts")
    }



    const NewContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(NewContact);
    throw new Error("contact not updated!!")
}); 

//@desc delete a  contact 
//@route DELET /api/contacts/:id
//@acess public 

const deleteContact = asyncHandler(async(req, res) => {
    const deleteOneContact = await Contact.findByIdAndDelete(req.params.id); 
    if(!deleteOneContact){
        res.status(404); 
        throw new Error("contact with id not found")

    }
    if(deleteOneContact.user_id.toString() !== req.user.id){
        res.status(403); 
        throw new Error("User can't have permission to update other user contacts")
    }
    res.status(200).json({'deleted contact': deleteOneContact});
    throw new Error("contact deleted!!"); 
}); 





module.exports = { getContact, 
                getContactFor, 
                createContact, 
                updateContact, 
                deleteContact }; 