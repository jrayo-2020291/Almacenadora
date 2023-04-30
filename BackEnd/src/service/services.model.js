'use strict';
const mongoose= require ('mongoose');

const productSchema = mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
      unique:true,
    },
    description: {
      type: String,
      required:true,
    },
    price:{
      type:Number,
      required:true
    },
    date: {
      type: Date,
      Required:true,
    },
  
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("Services", productSchema);
