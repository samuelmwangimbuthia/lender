const express = require ('express')
const mongoose = require ('mongoose'); // no need to deal with mongodb directly
const bodyParser = require ('body-parser')
const cors = require('cors')

const app = express();
const db = mongoose.connect('mongodb://localhost/lender') // the database to connect to
const port = process.env.PORT || 8080
const lendersRouter = express.Router();
const Lender = require ('./src/app/lenderModel');

//To kick off the body parser for the purpose of the post method
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Enable CORS
app.use(cors());
app.options('*', cors());


lendersRouter.route('/lenders')

.post((req, res)=>{
  const lender = new Lender(req.body);
  //console.log(lender);
  lender.save();
  return res.status(201).json(lender)
})
.get((req, res)=>{
  //  const response = {hello:'this is my api'}
  //  res.json(response);
  const {query} = req;
  Lender.find(query, (err, lenders)=>{
    if(err){
     return res.send(err)
    } else {
     return res.json(lenders)
    }
  })
});
lendersRouter.route('/lenders/:lenderId')
.get((req, res)=>{
  Lender.findById(req.params.lenderId, (err, lender)=>{
    if(err){
     return res.send(err)
    } else {
     return res.json(lender)
    }
  })
})
.put((req,res)=>{
  Lender.findById(req.params.lenderId, (err, lender)=>{
    if(err){
     return res.send(err)
    } else {
      lender.first_name = req.body.first_name;
      lender.last_name = req.body.last_name;
      lender.email = req.body.email;

      lender.save();

     return res.json(lender)
    }
  });
})
.delete((req, res)=>{
  Lender.findById(req.params.lenderId, (err, lender)=>{

    lender.remove((err)=>{
      if(err){
       return res.send(err)
      } else {
       return res.sendStatus(204)
      }
    })
  });


})
// to wire up to handle this route
app.use('/api', lendersRouter);

app.get('/', (req,res)=>{
  res.send('hello world')
});

app.listen(port, ()=>{
  console.log(`Running on port: ${port}`);
})
