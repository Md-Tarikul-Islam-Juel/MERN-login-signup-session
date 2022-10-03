const express=require('express')
const router=express.Router()

const signupValidator=require('../validator/auth/signupValidator')
const loginValidator=require('../validator/auth/loginValidator')
const {isUnAuthinticated,isAuthenticated}=require('../middlewares/authMiddleware')

const  {
    loginGetController,
    signupPostController,
    loginPostController,
    logoutController,
    isAuthinticatedController
}=require('../controllers/authController')

router.get('/login',isUnAuthinticated,loginGetController)
router.post('/signup',isUnAuthinticated,signupValidator,signupPostController)
router.post('/login',isUnAuthinticated,loginValidator,loginPostController)
router.get('/isAuthinticated',isAuthenticated,isAuthinticatedController)
router.get('/logout',logoutController)


module.exports=router