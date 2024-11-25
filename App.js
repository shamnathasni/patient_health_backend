const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
require('dotenv').config(); 
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:"https://patienthealth.netlify.app/",
}));
  

const db_config =require("./config/db_config")


const route = require("./routes/route");
app.use(route);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
