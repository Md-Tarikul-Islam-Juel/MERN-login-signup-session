const bcrypt=require('bcrypt')
const {validationResult}=require('express-validator')

const User=require('../models/User')
const errorFormatter=require('../utils/validationErrorFormatter')


async function signupPostController(req,res,next){
    const {username,email,password}=req.body

    let errors=validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        return res.status(200).json({message:errors.mapped()})
    }
    
    try{
        let hashedPassword=await bcrypt.hash(password,11)

        const user=new User({
            username,
            email,
            password:hashedPassword
        })

        const createdUser= await user.save()
        res.status(201).json({message:"user registration successfully"})
    }
    catch(e){
        console.log(e)
        next(e)
    }
   
}
function loginGetController(req,res,next){
    return res.status(200).json({message:"login first"})
}

async function loginPostController(req,res,next){
    const {email,password}=req.body

    let errors=validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        let x=errors.mapped()
        return res.status(200).json({message:x.email||x.password})
    }

    try{
        let user= await User.findOne({email})
        
        if(user){
            let passMatch=await bcrypt.compare(password,user.password)
            if(passMatch){
                //session
                req.session.isLoggedIn=true
                req.session.user=user

                req.session.save(error=>{
                    if(error){
                        console.log(error)
                        return next(error)
                    }
                    else{
                        console.log(user)
                        return res.status(200).json({message:"login successfully",username:user.username
                    })
                    }
                })
                
            }
            else{
                return res.status(200).json({message:"password does not matched"})
            }
        }
        else{
            return res.status(200).json({message:"user not found"})
        }
    }
    catch(e){
        console.log(e)
        next(e)
    }
}

function logoutController(req,res,next){
    req.session.destroy(e=>{
        if(e){
            console.log(e)
            return next()
        }
        else{
            return res.status(200).json({message:"successfully logout"})
        }
        
    })
}

function isAuthinticatedController(req,res,next){
    return res.status(200).json({message:"already logged in",username:req.user.username})
}

module.exports={signupPostController,loginGetController,loginPostController,logoutController,isAuthinticatedController}