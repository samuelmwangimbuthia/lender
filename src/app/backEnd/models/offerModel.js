const mongoose = require('mongoose' )
const {Schema} = mongoose;

const offerModel = new Schema(

   {
     lender_name: {type: String},
    amount:  {type: Number},
    interest:  {type: Number},
    interest_type:  {type: String},
    required_collateral:  {type: String},
    duration:  {type: String},
    date_created:  {type: String},
    issued:  {type: Boolean},
  },
  { collection : 'Offers' }

)

module.exports = mongoose.model('Offer', offerModel);
