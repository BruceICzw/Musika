const express = require('express');

const app = express();


const PORT = 3000;

//Starting the server
const server = app.listen(PORT, () => {
    console.log(`Server runin on port ${PORT}....`);
})