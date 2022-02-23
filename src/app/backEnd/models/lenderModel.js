const mongoose = require('mongoose' )
const {Schema} = mongoose;

const lenderModel = new Schema(

   {
     id: {type: Number},
    email: {type: String},
    first_name:  {type: String},
    last_name:  {type: String},
    avatar:  {type: String},
  }

)

module.exports = mongoose.model('Lender', lenderModel);
