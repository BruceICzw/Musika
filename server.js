const express = require('express');
const connectDB = require('./database/db');

const app = express();


const PORT = 3000;
connectDB();
//Starting the server
app.listen(PORT, () => {
    console.log(`Server runin on port ${PORT}....`);
})