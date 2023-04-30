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
        let dateNow = new Date();
        let timeMonth = (1000*60*60*24*30) * data.month;
        let sumTime = dateNow.getTime()+timeMonth;
        let dateExpired = new Date(sumTime)
        let dataLease = {
            user: data.user,
            storage: data.storage,
            description: data.description,
            rentalDate: dateNow,
            monthRental: data.month,
            dueDate: dateExpired,
            total: price * data.month
        }
        let storage = await Storage.findOne({_id: dataLease.storage})
        if(storage.availability == 'nodisponible') return res.send({message: 'This storage already in lease'});
        let stateStorage = await Storage.findOneAndUpdate({_id: dataLease.storage}, {availability: 'nodisponible'}, {new: true});
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
                service: data.serviceId
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
            let newTotal = lease.total - serviceExist.price;
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
        let leaseExist = await Lease.findOne({_id: leaseId});
        if(!leaseExist) return res.status(404).send({message: 'Lease not found'});
        if(data.storage == leaseExist.storage) return res.send({message: 'To use the update function you must enter a new Storage'});
        let oldStorage = await Storage.findOne({_id: leaseExist.storage});
        let newStorage = await Storage.findOne({_id: data.storage});
        let newTotal = leaseExist.total - (oldStorage.monthlyPrice * leaseExist.monthRental) + (newStorage.monthlyPrice*leaseExist.monthRental)
        let params = {
            storage: newStorage._id,
            total: newTotal
        }
        let oldStorageState = await Storage.findOneAndUpdate({_id: leaseExist.storage}, {availability: 'disponible'}, {new: true});
        let newStorageState = await Storage.findOneAndUpdate({_id: data.storage}, {availability: 'nodisponible'}, {new: true});
        let updatedLease = await Lease.findOneAndUpdate({_id: leaseId}, params, {new: true});
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