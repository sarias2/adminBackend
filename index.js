const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config')

const app = express();

app.use(cors());

app.use(express.json());

dbConnection();

const port = process.env.PORT;


//Routes
app.use('/api/users', require('./routes/users.js'));
app.use('/api/login', require('./routes/auth.js'));

app.listen(port, () => {
    console.log('Server runnung on port ' + port);
})