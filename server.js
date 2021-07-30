const express = require('express');
const cors = require('cors');
require('./server/config/mongoose.config');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());                      
app.use(express.urlencoded({ extended: true }));

require('./server/routes/film.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`)); 