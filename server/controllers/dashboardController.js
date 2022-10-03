function dashboardController(req,res,next){
    res.status(201).json({message:"logged in"})
}

module.exports=dashboardController