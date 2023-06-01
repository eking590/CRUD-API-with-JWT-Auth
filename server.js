const express = require('express'); 
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config(); 
connectDb(); 

const app = express(); 

const PORT = process.env.PORT || 6000; 


//middlewares 
app.use(express.json()); 
app.use(errorHandler);
app.use('/api/contacts', require('./routes/contactRoutes'));  
app.use('/api/users', require('./routes/userRoutes'));




app.listen(PORT, ()  => {
    console.log(`server is live on http://localhost/${PORT}`)
});  