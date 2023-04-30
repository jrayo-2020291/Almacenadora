'use restrict'
const Storage = require('./storage.model');
const Lease = require('../lease/lease.model')

exports.test =async(req,res)=>{
    return res.send({message:'Test function'});
}

//agregar bodega
exports.add = async(req,res)=>{
    try {
        let data = req.body;
        let existStorage = await Storage.findOne({name:data.name});
        if(existStorage) return res.send({message:'This NAME is already in use'});
        if(data.name===''||data.description===''||data.location===''||data.size===''||data.availability===''||data.monthlyPrice==='') return res.send({message:'Cannot send empty data'})
        let storage = new Storage(data);
        await storage.save();
        return res.send({message:'Storage created sucessfully'})
    } catch (err){
        console.error(err);
        return res.status(500).send({message:'Error added storage'})
    }
};

//listar bodegas
exports.get = async(req,res)=>{
    try {
        let storages = await Storage.find();
        if(!storages) return res.send({message:'Storage not found'})
        return res.send({storages})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'error listing storage'})
    }
};

//search por nombre autocompletable
exports.getForName = async(req,res)=>{
    try {
        let data = req.body;
        let params={
            name: data.name
        }
        if(data.name==='') return res.send({message:'Does not exist Storage'})
        let storages = await Storage.find({
            name:{
                $regex:params.name,
                $options:'i'
            }
        })
        return res.send(storages)
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error search Storage'})
    }
}

//get por ID
exports.getForId = async(req,res)=>{
    try {
        let storageId= req.params.id;
        let existStorage = await Storage.findOne({_id:storageId});
        if(!existStorage) return res.send({message:'Storage not found'});
        return res.send({existStorage});
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error getted Storage'})
    }
}

//get por disponibilidad
exports.getForAvailability = async(req,res)=>{
    try {
        let data = req.body;
        let existStorage = await Storage.find({availability:data.availability});
        if(!existStorage) return res.send({message:'Storage not found'});
        return res.send(existStorage)
    } catch (err) {
        console.log(err);
        return res.status(500).send({message:'Error getted Storage'})
    }
}

//actualizar bodega
exports.update = async(req,res)=>{
    try {
        let storageId = req.params.id;
        let data = req.body;
        let storage= await Storage.findOne({_id:storageId});
        if(!storage) return res.send({message:'storage not found and not delete'})
        if(data.name !== storage.name){
            let existStorage= await Storage.findOne({name:data.name});
            if(existStorage) return res.send({message:'Name is in use and not updated'})
        }
        let updateStorage = await Storage.findOneAndUpdate({_id:storageId},data,{new:true});
        return res.send({message:'Storage updated sucessfully', updateStorage})
    } catch (err) {
        console.error(err)
        return res.status().send({message:'Error updated Storage'})
    }
}

//eliminar Storage
exports.delete = async(req,res)=>{
    try {
        let storageId = req.params.id;
        //buscar que no este asociada con USER
        let existStorage = await Storage.findOne({_id:storageId})
        console.log(existStorage.id)
        let existUser = await Lease.findOne({storage:existStorage.id});
        if(existUser) return res.send({message:'You cannot delete a warehouse that is in use'})
        //
        let storageDelete = await Storage.findOneAndDelete({_id:storageId});
        if(!storageDelete) return res.send({message:'Storage not found and not delte'});
        return res.send({message:`Storage witch name ${storageDelete.name} delete sucessfully`})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error delete storage'})
    }
}