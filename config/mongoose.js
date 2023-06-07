const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Successfully!! connected to the database'))
  .catch((error) => {
    console.error('Error in connecting to the database and the error is :-', error);
  });