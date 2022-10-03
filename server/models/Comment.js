//User, post, body, replays

const {Schema,model}=require('mongoose')
const User=require('./User')
const Post=require('./Post')

const commentShema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:Post,
        required:true
    },
    body:{
        type:String.apply,
        trim:true,
        required:true
    },
    replies:[
        {
            body:{
                type:String,
                required:true
            },
            user:{
                type:Schema.Types.ObjectId,
                ref:User,
                required:true
            },
            createAt:{
                tyep:Date,
                default:new Date()
            } 
        }
    ]
},{timestamps:true})


const Comment=model('Comment',commentShema)

module.exports=Comment