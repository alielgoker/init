import express from 'express'
const router = express.Router()
import { createProduct , getAllProducts , getSingleProduct , deleteProduct , updateProduct , reviewProduct , deleteReview , updateReview} from '../controllers/product.controllers.js'
import upload from '../helpers/uploadFunc.js'
import { adminOnly, verifyToken } from '../middlewares/verifyToken.js'


router.route("/")
            .post(verifyToken,adminOnly,createProduct)
            .get(getAllProducts)
router.route("/:id")
            .get(getSingleProduct)
            .delete(verifyToken,adminOnly,deleteProduct)
            .patch(verifyToken,adminOnly,updateProduct)
router.route("/review/:id")
            .patch(verifyToken,reviewProduct)
            .delete(verifyToken,deleteReview)
router.route("/updateReview/:id")
            .patch(verifyToken,updateReview)


export default router 