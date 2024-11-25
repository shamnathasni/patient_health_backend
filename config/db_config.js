const mongoose = require('mongoose');

const uri = "mongodb+srv://shamnathasni4:905905@cluster0.guc1xbz.mongodb.net/PatientsData?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((error) => {
    console.error('DB connection error:', error);
  });
