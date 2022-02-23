const express = require ('express');

function routes(Offers){
  const offersRouter = express.Router();
  offersRouter.route('/offers')
  .get((req,res)=>{
     //const response = {message:'Hello World'}
   //res.send(response)
   const {query} = req; //http://localhost:8080/offer/offers?lender_name=Janet Weaver, Filter offers by lenders name
     Offers.find(query, (err,Offers)=>{
       if(err){
         return res.send(err)
       }
       else{
         return res.json(Offers)
       }

     })
  })
  offersRouter.route('/offers/:offerId')
  .get((req,res)=>{
    Offers.findById(req.params.offerId, (err, offer) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json(offer);
      }
    });
  })
return offersRouter;
}

module.exports = routes;
