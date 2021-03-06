const db = require('../models')
const config = require('../config/auth.config')
const jwt = require('jsonwebtoken');
const cons = require('consolidate');
const User = db.user;


const getAllStudents = (req,res) =>{
    User.find({role:"student"})
    .lean()
    .exec((err,result)=>{
        if(err){
            res.status(500).send({message:err});
        }
        res.status(200).send(result);
    })
}

const getAllInstructors = (req,res)=>{
    User.find({role:"instructor"})
    .lean()
    .exec((err,result)=>{
        if(err){
            res.status(500).send({message:err});
        }
        res.status(200).send(result);
    })
}

signUp = (req,res,err)=>{
    const user = new User({
        firstName:req.body.firstname,
        lastName:req.body.lastname,
        email:req.body.email,
        role:req.body.role,
        password:req.body.password
    })

    user.save((err,user)=>{
       if(err){
           res.status(500).send({message:err})
       }
        res.status(200).send({message:`${req.body.role} inserted successfully!`})
    })
}

signIn=(req,res,next)=>{
    User.findOne({email:req.body.email,password:req.body.password}).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(!user){
           return res.status(404).send({message:"user not found"});
        }
        else{
            token = jwt.sign({id:user.id},config.secret,{expiresIn:86400})
            req.session.user_id=user.id;
            req.session.isLoggedIn = true;
            res.status(200).send({user})
        }
        
    })
}

const userCont = { 
    signUp,
    signIn,
    getAllInstructors,
    getAllStudents
}
module.exports = userCont;