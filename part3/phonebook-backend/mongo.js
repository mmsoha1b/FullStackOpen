const mongoose = require('mongoose');
if (process.argv.length < 3){
    console.log("Please type password");
}

const password = process.argv[2];

const personSchema = new mongoose.Schema({
    name:String,
    number:String,
});
const Person = mongoose.model('Person',personSchema);
mongoose.connect(url)
.then(response=>{
    console.log('Connected');
    if(process.argv.length === 5){
        const name = process.argv[3];
        const number = process.argv[4];
        const person = new Person({
            name: name,
            number: number
        });
        person.save().then((result)=>{
            console.log('saved');
            mongoose.connection.close();
        })
    }
    else if(process.argv.length===3){
        Person.find({}).then((people)=>{
            people.forEach((person)=>{
                console.log(person);
            })
            mongoose.connection.close();
        })
    }
})