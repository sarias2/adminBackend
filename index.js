const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config')

const app = express();

app.use( cors() );

dbConnection();

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Welcome to my backend'
    })
})

app.listen (port, () => {
    console.log('Server runnung on port ' + port);
})
