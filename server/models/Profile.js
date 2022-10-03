//user, name, title, bio, profile_pic, links{fb,linkedin}, post, bookmarks

const {Schema,model}=require('mongoose')
const Post=require('./Post')
const User=require('./User')

const profileShema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    name:{
        type:String,
        trim:true,
        maxlength:30,
        required:true
    },
    title:{
        type:String,
        trim:true,
        maxlength:100
    },
    bio:{
        type:String,
        trim:true,
        maxlength:500
    },
    profilePic:{
        type:string
    },
    links:{
        website:string,
        facebook:string,
        twitter:string,
        github:string
    },
    posts:[
        {
            type:Schema.Types.ObjectId,
            ref:Post
        }
    ],
    posbookmarks:[
        {
            type:Schema.Types.ObjectId,
            ref:Post
        }
    ]
})

const Profile=model('Profile',profileShema)

module.exports=Profile