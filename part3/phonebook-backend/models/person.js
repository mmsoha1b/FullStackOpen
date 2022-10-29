
const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then((result) => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Connection failed',err.message);
  });
const personSchema = new mongoose.Schema({
  name:{
    type: String,
    minLength: 3,
  },
  number:{
    type:   String,
    minLength:8,
    validate:{
      validator:function(value){
        return /^\d{2,3}-\d+$/.test(value);
      },
      message: number => `${number} is not a valid phone number`
    }  }
});
personSchema.set('toJSON',{
  transform:(document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
module.exports =  mongoose.model('Person',personSchema);