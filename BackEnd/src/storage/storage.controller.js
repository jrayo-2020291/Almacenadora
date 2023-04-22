'use restrict'
const Storage = require('./storage.model');

exports.test =async(req,res)=>{
    return res.send({message:'Test function'});
}

//agregar bodega
exports.add = async(req,res)=>{
    try {
        let data = req.body;
        let existStorage = await Storage.findOne({name:data.name});
        if(existStorage) return res.send({message:'This NAME is already in use'});
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

//actualizar bodega
exports.update = async(req,res)=>{
    try {
        let storageId = req.params.id;
        let data = req.body;
        let updateStorage = await Storage.findOneAndUpdate({_id:storageId},data,{new:true});
        if(!updateStorage) return res.send({message:'Storage not found and not delete'});
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
        let storageDelete = await Storage.findOneAndDelete({_id:storageId});
        if(!storageDelete) return res.send({message:'Storage not found and not delte'});
        return res.send({message:`Storage witch name ${storageDelete.name} delete sucessfully`})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error delete storage'})
    }
}