const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const currency = mongoose.Types.Currency;
const promoSchema =  new Schema(
    {
        name:{
            type: String,
            required: true

        },

        image: {
            type: String,
            required: true

        },

        label:{
            type: String,
        required: true
        },
        price:{
            type: currency,
            required: true,
            min: 0
        },
        description: {
            type: String,
            required: true

        },
        featured: {
           type: Boolean,
            required: true
        }
  });

  var Promos = mongoose.model('Promo', promoSchema);
  module.exports= Promos;