//title, body, author, tags, thumbnil, readtime, likes, dislikes, comments

const {Schema,model}=require('mongoose')

const Comment=require('./Comment')
const User=require('./User')

const postSchema= new Schema({
    title:{
        type:String,
        trim:true,
        maxlength:100,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    tags:{
        type:[String],
        required:true
    },
    thumbnil:{
        type:string
    },
    readTime:{
        type:string
    },
    likes:[
        {
            type:Schema.Types.ObjectId,
            ref:User
        }
    ],
    dislikes:[
        {
            type:Schema.Types.ObjectId,
            ref:User
        }
    ],
    comment:[
        {
            type:Schema.Types.ObjectId,
            ref:Comment
        }
    ]
},{timestamp:true})

const Post=model('Post',postSchema)

module.exports=Post