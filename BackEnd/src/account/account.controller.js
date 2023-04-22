'use strict'

const Account = require('./account.model');
const { validateData, encrypt, checkPassword, checkUpdate } = require('../utils/validate');
const { createToken } = require('../services/jwt');

exports.test = (req, res)=>{
    res.send({message: 'Test function is running'});
}

//agregar admin inicial
exports.addAdminInitial = async(req, res)=>{
    try{
        let passwordEncrypt = await encrypt("123");
        let adminInitial = {
            name: 'Josue',
            surname: 'Noj',
            username: 'jnoj',
            password: passwordEncrypt,
            email: 'jnoj@kinal.edu.gt',
            phone:'12345678',
            role:'admin'
        }
        let existAdmin = await Account.findOne({username: 'jnoj'});
        if(existAdmin) return console.log('Admin initial already created');
        let createAdminInitial = new Account(adminInitial);
        await createAdminInitial.save();
        return console.log('Admin initial created');
    }catch(err){
        return console.error(err);
    }
}
//registrar workers
exports.register = async(req, res)=>{
    try{
        let data = req.body;
        data.password = await encrypt(data.password);
        data.role = 'worker';
        let existAccount =await Account.findOne({username: data.username})
        if(existAccount) return res.send({message:'username is already taken'})
        let account = new Account(data);
        await account.save();
        return res.send({message: 'Account created sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating account'});
    }
};
//Logueo
exports.login = async(req, res)=>{
    try{
        let data = req.body;
        let credentials = {
            username: data.username,
            password: data.password
        }
        let msg = validateData(credentials);
        if(msg) return res.status(400).send({message: msg})
        let user = await Account.findOne({username: data.username});
        if(user && await checkPassword(data.password, user.password)) {
            let token = await createToken(user)
            return res.send({message: 'User logged successfully', token});
        }
        return res.status(404).send({message: 'Invalid credentials'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error not logged'});
    }
}
//Listar trabajadores
exports.get = async(req,res)=>{
    try {
        let accounts=await Account.find();
        return res.send({accounts})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error get Workers'})
    }
}
//Filtro por nombre autocompletable
exports.getForName = async(req,res)=>{
    try {
        let data = req.body;
        let params = {
            username: data.username 
        }
        if(data.username==='') return res.send({message:'Does not exist account'})
        let accounts = await Account.find({
            username:{
                $regex:params.username,
                $options:'i'
            }
        })
        return res.send({accounts})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error get Workers'})
    }
}
//Filtro por Id unico
exports.getForId = async (req,res)=>{
    try {
        let accountId = req.params.id;
        let existAccount = await Account.findOne({_id:accountId});
        if(!existAccount) return res.send({message:'Account not found'})
        return res.send({existAccount})
    } catch(err) {
        console.error(err)
        return res.status(500).send({message:'Error get Workers'})
    }
}
//actualizar trabajador
exports.update = async(req, res)=>{
    try{
        let accountId = req.params.id;
        let data = req.body;
        let update = checkUpdate(data, true);
        if(!update) return res.status(400).send({message: 'They have sent non-updatable data'});
        let accountUpdate = await Account.findOneAndUpdate({_id: accountId},data,{new: true});
        if(!accountUpdate) return res.status(404).send({message: 'User not found and not updated'});
        return res.send({message: 'Account updated sucessfully', accountUpdate})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error not updated'});
    }
}
//borrar trabajador
exports.delete = async(req, res)=>{
    try {
        let accountId = req.params.id;
        let existAccount = await Account.findOne({_id:accountId});
        if(existAccount.role==='ADMIN') return res.send({message:'can not update other admins'})
        let accountDelete = await Account.findOneAndDelete({_id:accountId});
        if(!accountDelete) return res.send({message:'Account not found and not Deleted'});
        return res.send({message: `Account with username ${accountDelete.username} deleted sucessfully`})
    } catch (error) {
        console.error(error);
        return res.status(500).send({message:'Error not delete'})
    }
}