const express = require ('express')
const mongoose = require ('mongoose'); // no need to deal with mongodb directly
const bodyParser = require ('body-parser')
const cors = require('cors')

const app = express();
const db = mongoose.connect('mongodb://localhost/lender') // the database to connect to
const port = process.env.PORT || 8080

//Imports for lender routes
const Lender = require ('./src/app/backEnd/models/lenderModel');
const lendersRouter =require ('./src/app/backEnd/routes/lendersRouter')(Lender)

//Imports for offer routes
const Offer = require ('./src/app/backEnd/models/offerModel')
const offersRouter = require('./src/app/backEnd/routes/offersRouter')(Offer)

//To kick off the body parser for the purpose of the post method
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Enable CORS
app.use(cors());
app.options('*', cors());

// to wire up to handle this route
app.use('/api', lendersRouter);
app.use('/offer', offersRouter);

app.get('/', (req,res)=>{
  res.send('hello world')
});

app.listen(port, ()=>{
  console.log(`Running on port: ${port}`);
})
