require('dotenv').config();
const PORT = process.env.port;
const mongoUrl = process.env.mongoUrl;
module.exports={
    PORT,
    mongoUrl
};