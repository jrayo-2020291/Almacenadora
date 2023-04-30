"use strict";

const Service = require("./services.model");


exports.addService = async (req, res) => {
  try {
    let data = req.body;
    let now = new Date();
    data.fecha = now;
    let existService = await Service.findOne({ name: data.name });
    if (existService) {
      return res.send({ message: "Service already created" });
    }
    let newService = new Service(data);
    await newService.save();
    return res.status(201).send({ message: "Created Service",newService });
  } catch (err) {
    console.log(err);
  }
};

exports.find = async (req, res) => {
  try {
    let data = req.body;
    let servicename = req.body.name;
    let name= data.name;
    if(name===''){
    return res.status(200).send({message:'Empty field'})
    }
    let service = await Service.find({ name: servicename });
    return res.send(service);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Invalid name" });
  }
};

exports.getForId = async(req,res)=>{
  try {
      let serviceId= req.params.id;
      let existService = await Service.findOne({_id:serviceId});
      if(!existService) return res.send({message:'Service not found'});
      return res.send({existService});
  } catch (err) {
      console.error(err);
      return res.status(500).send({message:'Error getting Service'})
  }
}


exports.getServices = async(req, res)=>{
  try{
      let services = await Service.find();
      return res.send({services});
  }catch(err){
      console.error(err);
      return res.status(500).send({message: 'Error getting services'})
  }
}
exports.updateService = async(req, res)=>{
  try{
      let serviceId = req.params.id;
      let data = req.body;
      let existService = await Service.findOne({name: data.name});
      if(existService) {
          if(existService._id != serviceId) return res.send({message: 'Service already created'});
          let updatedService = await Service.findOneAndUpdate( 
              {_id: serviceId},
              data,
              {new: true}
          );
          if(!updatedService) return res.status(404).send({message: 'Service not found and not updated'});
          return res.send({updatedService})
      }
      let updatedService = await Service.findOneAndUpdate( 
          {_id: serviceId},
          data,
          {new: true}
      );
      if(!updatedService) return res.status(404).send({message: 'Service not found and not updated'});
      return res.send({updatedService})
  }catch(err){
      console.error(err);
      return res.status(500).send({message: 'Error updating Service'});
  }
}