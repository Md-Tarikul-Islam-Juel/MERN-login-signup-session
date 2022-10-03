const {body}=require('express-validator')

const User=require('../../models/User')

const loginValidator=[
    body('email')
        .not().isEmpty().withMessage(`Email can not be empty`)
        .custom(async (email)=>{
            let user= await User.findOne({email})
            
            if(!user){
                return Promise.reject(`Email does not exist`)
            }
            
        }),
        
    
    body('password')
        .not().isEmpty().withMessage(`password can not be empty`)
        
        
]


module.exports=loginValidator