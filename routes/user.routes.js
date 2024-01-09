import express from 'express'
const router = express.Router()
import { registerUser , loginUser , logOut , getUser , isLoginStatus , updateProfile , updatePhoto} from '../controllers/user.controllers.js'
import  { verifyToken }  from '../middlewares/verifyToken.js'
import upload from '../helpers/uploadFunc.js'


router.route("/register")
            .post(registerUser)
router.route("/login")
            .post(loginUser)
router.route("/logout")
            .post(logOut)
router.route("/getuser")
            .get(verifyToken,getUser)
router.route("/loginStatus")
            .get(isLoginStatus)
router.route("/updateProfile")
            .patch(verifyToken,updateProfile)
router.route("/updatePhoto")
            .patch(upload.single("photo") , verifyToken,updatePhoto)

export default router
//upload.single("photo"),