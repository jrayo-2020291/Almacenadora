'use strict'

const Lease = require('./lease.model');
const Storage = require('../storage/storage.model');
const Service = require('../service/services.model');

exports.test = (req, res)=>{
    res.send({message: 'Test funtion for lease is running'});
}

exports.add = async(req, res) => {
    try{
        let data = req.body;
        let priceStorage = await Storage.findOne({_id: data.storage});
        if(!priceStorage ) return res.status(404).send({message: 'The id does not belong to a record in the database'})
        let price = priceStorage.monthlyPrice;
        let dataLease = {
            user: data.user,
            storage: data.storage,
            description: data.description,
            rentalDate: data.rentalDate,
            dueDate: data.dueDate,
            total: price
        }
        let newLease = new Lease (dataLease);
        await newLease.save();
        return res.send({message: 'New Lease created', newLease});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error adding lease'});
    }
}

exports.addService = async(req, res)=>{
    try{
        let leaseId = req.params.id;
        let data = req.body;
        let serviceExist = await Service.findOne({_id: data.serviceId});
        if(serviceExist){
            let serviceAlready = await Lease.findOne({$and:[
                {
                    _id: leaseId,
                    'services.service': data.serviceId
                }
            ]});
            let params = {
                service: data.serviceId,
                price: serviceExist.price
            };
            let lease = await Lease.findOne({_id: leaseId});
            let newTotal = lease.total + serviceExist.price;
            if(serviceAlready) return res.send({message: 'Service already contracted'});
            let updatedLease = await Lease.findOneAndUpdate({_id: leaseId}, {$push:{'services': params}, total: newTotal}, {new:true});
            return res.send({message: 'Contrated Service: ' + updatedLease});
        }return res.status(404).send({message: 'Service not found'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error adding service'});
    }
}

exports.substractService = async(req, res)=>{
    try{
        let leaseId = req.params.id;
        let data = req.body;
        let serviceExist = await Service.findOne({_id: data.serviceId});
        if(serviceExist){
            let serviceExistInLease = await Lease.findOne({$and:[
                {
                    _id: leaseId,
                    'services.service': data.serviceId
                }
            ]});
            let lease = await Lease.findOne({_id: leaseId});
            let newTotal = lease.total + serviceExist.price;
            if(!serviceExistInLease) return res.send({message: 'You have not contracted this service'});
            let updatedLease = await Lease.findOneAndUpdate({_id: leaseId}, {$pull:{'services': {'service':data.serviceId}}, total: newTotal}, {new:true});
            return res.send({message: 'Contrated Service: ' + updatedLease});           
        }
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error deleting service'});
    }
}

exports.get = async(req, res) => {
    try{
        let lease = await Lease.find().populate('user').populate('storage').populate('services.service');
        if(!lease) return res.status(404).send({message: 'Leases not found'});
        return res.send({lease});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting leases'})
    }
}

exports.getById = async(req, res) => {
    try{
        let leaseId = req.params.id;
        let lease = await Lease.findOne({_id: leaseId}).populate('user').populate('storage').populate('services.service');
        if(!lease) return res.status(404).send({message: 'Lease not found'});
        return res.send({lease});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting lease'});
    }
}

exports.getByUser = async(req, res) => {
    try{
        let data = req.body;
        let userId = data.user;
        let lease = await Lease.find({user: userId}).populate('user').populate('storage').populate('services.service');
        if(!lease)return res.status(404).send({message: 'Lease not found'})
        return res.send({lease});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error gettin lease by user'});
    }
}

exports.updateLease = async (req, res)=>{
    try{
        let leaseId = req.params.id;
        let data = req.body;
        if(data.total || data.services)return res.send({message: 'Parameter not allowed'});
        let leaseExist = await Lease.findOne({_id: leaseId});
        if(!leaseExist) return res.status(404).send({message: 'Lease not found'});
        let updatedLease = await Lease.findOneAndUpdate({_id: leaseId}, data, {new: true});
        if(!updatedLease) return res.status(404).send({message: 'Lease not found and not updated'});
        return res.send({message: 'Lease updated successfully', updatedLease});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating lease'});
    }
}

exports.deleteLease = async (req, res)=>{
    try{
        let leaseId = req.params.id;
        let leaseExist = await Lease.findOne({_id: leaseId});
        if(!leaseExist) return res.status(404).send({message: 'Lease not found'});
        let deleteLease = await Lease.findOneAndDelete({_id: leaseId});
        if(!deleteLease) return res.status(404).send({message: 'Lease not found and not deleted'});
        return res.status(200).send({message: 'Lease deleted successfully', deleteLease});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error deleting lease'});
    }
}