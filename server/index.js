require('dotenv').config()
const express=require("express")
const mongoose = require('mongoose');
const morgan=require('morgan')
const session=require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

//Import Router
const authRouter=require('./routers/authRouter')
const dashboardRoute=require('./routers/dashboardRoute')

//import middlewire
const {bindUserWithRequest}=require('./middlewares/authMiddleware')


//session db connect
let store = new MongoDBStore({
    uri: process.env.DB_URL,
    collection: 'mySessions',
    expires: 1000 * 60 * 60 *2//2hrs
  });

const app=express()

if(app.get('env')==="DEVELOPMENT"){
    app.use(morgan('dev'))
}


PORT =process.env.PORT ||8080




//-----middleware start-----
const middlewareArray=[
    express.urlencoded({extended:true}),
    express.json(),
    express.static('public'),
    session({
        secret:process.env.SECRECT_KEY ||'SECRECT_KEY',
        resave:false,
        saveUninitialized:false,
        store:store
    }),
    bindUserWithRequest(),
]
app.use(middlewareArray)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true); // allows cookie to be sent
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, HEAD, DELETE"); // you must specify the methods used with credentials. "*" will not work. 
    next();
});

//-----middleware end-----

app.use('/auth',authRouter)
app.use('/dashboard',dashboardRoute)

app.get('/',(req,res)=>{   
    res.send("home-page")
})

app.get('*',(req,res)=>{
    res.send("404")
})

//---------Database start---------
const mongoDB = 'mongodb+srv://juel:juel24434@cluster0.jhjiolj.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(mongoDB)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`server and database is running at ${PORT}`)
        }) 
    })
    .catch((e)=>{
        console.log(e)
    })
//---------Database end---------

