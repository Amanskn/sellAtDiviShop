const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://29maddhesiaaman:McDhjreJknjbEPsy@cluster0.xfmjuxm.mongodb.net/")
  .then(() => console.log('Successfully!! connected to the database'))
  .catch((error) => {
    console.error('Error in connecting to the database and the error is :-', error);
  });