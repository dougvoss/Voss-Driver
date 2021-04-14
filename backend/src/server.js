const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

require('./routes')(app);

const port = process.env.PORT || 3434;

app.listen(
    port, 
    console.log('Server is running on port ' + port + ' ... ')
);