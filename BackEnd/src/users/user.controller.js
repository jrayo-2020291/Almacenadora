'use strict'

const User  = require('./user.model');

exports.test = (req, res) =>{
    res.send({message: 'Test function for User is running'});
}

exports.add = async(req, res) =>{
    try{
        let data = req.body;
        let createUser = new User(data) 
        await createUser.save();
        return res.send({message: 'New User created', createUser});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error adding User'});
    }
}

exports.addDefaultUser = async()=>{
    try{   
        let userDefault = {
            name: 'Hugo',
            surname: 'Pérez',
            DPI: '1492 29863 1200',
            email: 'user@example.com',
            phone: '5320 5640'
        };
        let userExist = await User.findOne({DPI: '1492 29863 1200'});
        if(userExist) return console.log('User default already exist');
        let createUserDefault = new User(userDefault);
        await createUserDefault.save();
        console.log('User default created');
    }catch(err){
        return console.error(err);
    }
}

exports.get = async(req, res) => {
    try{
        let users = await User.find();
        if(!users)return res.status(404).send({message: 'Users not found'});
        return res.send({users});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Errog getting users'});
    }
}

exports.getByDPI = async(req, res) => {
    try{
        let data = req.body;
        let dpi = {
            DPI: data.DPI
        };
        if(data.DPI === '') return res.send({message: 'User not found'});
        let users = await User.find({
            DPI: {
                $regex:dpi.DPI,
                $options:'i'
            }
        });
        return res.send({users});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Errog getting user'});
    }
}

exports.getById = async(req, res) => {
    try{    
        let userId = req.params.id;
        let user = await User.findOne({_id: userId});
        if(!user) return res.status(404).send({message: 'User not found'});
        return res.send({user});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting user'});
    }
}

exports.updateUser = async(req, res) => {
    try{
        let userId = req.params.id;
        let data = req.body;
        let user = await User.findOne({_id: userId});
        if(!user)return res.status(404).send({message: 'User not found'});
        if(data.DPI !== user.DPI){
            let existUser = await User.findOne({DPI: data.DPI});
            if(existUser) return res.send({message: 'This DPI is already registered'});
        }
        let updatedUser = await User.findOneAndUpdate({_id: userId}, data, {new: true});
        return res.send({message: 'User updated', updatedUser});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error updating user'});
    }
}

exports.deleteUser = async(req, res) =>{
    try{
        let userId = req.params.id;
        /*Validacion para no eliminar un usario registrado en una arrendamiento- SE AGREGARÁ DESPUES
            let userExist = await Arrendamiento.findOne({user: userId})
            if(userExist) return res.send({message:'This user cannot be deleted because he is registered in a lease'})
        */
       let userDeleted = await User.findOneAndDelete({_id: userId});
       if(!userDeleted) return res.status(404).send({message: 'User not found and not deleted'});
       return res.send({message: 'User deleted', userDeleted});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error deleting user'});
    }
}