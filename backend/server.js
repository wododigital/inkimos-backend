require('dotenv').config();
const express=require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { url, live } =require('./config');

const app=express();
app.use(cookieParser());
app.use(cors({
    origin: url, 
    credentials: true,
    originmethods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization', 
    optionsSuccessStatus: 204
}));

app.use(express.json());

// const product=require('./routes/product/index');

const auth=require('./routes/auth/index');
const apis=require('./routes/api/index');
const contact_us=require('./routes/contact_us/index');
const career=require('./routes/career/index');
const jobs=require('./routes/jobs/index');

app.use('/',auth);
app.use('/api/',contact_us);
app.use('/api/',apis);
app.use('/api/',career);
app.use('/api/',jobs);


app.use('/media', express.static(path.join(__dirname, 'media')));

app.listen(3004, ()=>{
    console.log('server started 3004');
})