//username,email,password,profile_id

const {Schema,model}=require('mongoose')
// const Profile=require('./Profile')

const userSchema= new Schema({
    username:{
        type:String,
        trim:true,
        maxlength:15,
        required:true
    },
    email:{
        type:String,
        trim:true,
        maxlength:30,
        required:true
    },
    password:{
        type:String,
        requird:true
    }, 
},{
    timestamps:true
})


module.exports = model('User',userSchema)