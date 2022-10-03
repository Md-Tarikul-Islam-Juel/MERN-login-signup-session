const User=require('../models/User')

const bindUserWithRequest=()=>{
    return async(req,res,next)=>{
        if(req.session.isLoggedIn){
            try{
                const user=await User.findOne(req.session.user._id)
                req.user=user
                next()
            }
            catch(e){
                console.log(e)
                next(e)
            }
        }
        else{
            return next()
        }
    }
}

const isAuthenticated=(req,res,next)=>{
    if(req.session.isLoggedIn){
        next()
    }
    else{
        res.status(200).json({message:"login first"})
    }
    
}

const isUnAuthinticated=(req,res,next)=>{
    if(req.session.isLoggedIn){
        res.status(201).json({message:"already logged in"})
    } 
    else{
        next()
    }
}

module.exports={bindUserWithRequest,isAuthenticated,isUnAuthinticated}