const {body}=require('express-validator')

const User=require('../../models/User')

const signupValidator=[
    body('username')
        .isLength({min:2,max:15}).withMessage(`username must be between 2 to 15 character`)
        .trim()
        .custom(async (username)=>{
            let user= await User.findOne({username})
            if(user){
                return Promise.reject(`Username already exist`)
            }
        }),
    
    body('email')
        .isEmail().withMessage(`please provide a valid email`)
        .normalizeEmail()
        .custom(async (email)=>{
            let user= await User.findOne({email})
            if(user){
                return Promise.reject(`Email already exist`)
            }
        }),

    body('password')
        .isLength({min:5}).withMessage(`password at least 5 character`),

    body('confirmPassword')
        .isLength({min:5}).withMessage(`password at least 5 character`)
        .custom((confirmPassword,{req})=>{
            if(confirmPassword!==req.body.password){
                throw new Error(`password doesn't matched`)
            }
            else{
                return true
            }
        })
]


module.exports=signupValidator