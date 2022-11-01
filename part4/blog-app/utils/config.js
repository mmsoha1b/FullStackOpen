require('dotenv').config();
const PORT = process.env.port;
const mongoUrl = process.env.NODE_ENV==='test'? process.env.testMongoUrl : process.env.mongourl ;
module.exports={
    PORT,
    mongoUrl
};