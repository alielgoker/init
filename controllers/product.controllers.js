import product from '../model/product.model.js';
import { responseE, responseM, wrapper } from '../helpers/helpe.func.js';
import mongoose from 'mongoose';

  // create product
  const createProduct = wrapper(
    async (req, res) => {
      const { name , sku , category , brand , color , Quantity , sold , regularPrice , price , description , image , ratings} = req.body
      if(!name || !description || !category || !brand || !Quantity || !price){
        responseM(res , "Pleas Fill All Fildes")
      }
      // Create Product
      // const newProduct = await product({ name: req.body.name, description: req.body.description, category: req.body.
        const newProduct = await product.create({
          name,
          sku,
          category,
          brand,
          Quantity,
          description,
          image,
          regularPrice,
          price,
          color
          });
          return responseM(res , "Product Created Successfully" , 201 , newProduct)
    },"createProduct"
  )
  // get all product
  const getAllProducts = wrapper(async (req, res) =>{
    const products = await product.find();
    return responseM(res , "Get All Product Successfuly" , 200 , products)
  })
  // get Single Products
  const getSingleProduct = wrapper(
    async (req, res)=>{
      const id = req.params.id;
      const singleProduct = await product.findById(id);
      if (!singleProduct) {
        return responseE(res , "No Such Product Found",404)
        }
        return responseM(res , "Get Single Product Successfuly" , 200 , singleProduct)
    },"getSingleProduct"
    )
  // Delete product
  const deleteProduct = wrapper(
    async (req, res)=>{
      const id = req.params.id;
      try {
        await product.deleteOne({_id:id});
      } catch (error) {
        return responseE(res , "No Such Product Found",404)
      }

        return responseM(res , "Product Deleted Successfuly" , 200)
        },"deleteProduct"
    )
  // Update Product
  const updateProduct = wrapper(
    async (req, res)=>{
      const id = req.params.id;
      const { name ,category , brand , color , Quantity ,  regularPrice , price , description , image } = req.body
      // if(!name || !description || !category || !brand || !Quantity || !price ){
      // return  responseE(res , "No Data Changed To Modify it" , 404)
      // }
      const Product = await product.findById(id)
      if(!Product){
      return  responseE(res , "Product Not Found" , 404)
      }
      const updatedProduct = await product.findByIdAndUpdate({
        _id : id},
        { name ,category , brand , color , Quantity ,  regularPrice , price , description , image },
        {new : true,
        runValidators:true}
        )
        return responseM(res , "Product Updated Successfuly" , 200 , updatedProduct)
      },"updateProduct"
  )
  // Review Product
  const reviewProduct = wrapper(
    async (req, res)=>{
      const {star , review , reviewData} = req.body
      const { id } = req.params
      // validation
      if(star < 1 || !review){
        responseE(res , "Pleas Add a star and review" , 400)
      }
      const Product = await product.findById(id)
      if(!Product){
        responseE(res , "product not found" , 400)
      }
      //update rating
      Product.ratings.push({
        star ,
        review ,
        reviewData ,
        name:req.user.name,
        userID:req.user._id
      })
      Product.save()
      responseM(res , " product review added successfully" , 200)
    })
  // Delet review
  const deleteReview = wrapper(
    async (req, res)=>{
      const {userID} = req.body
      const Product = await product.findById(req.params.id)
      if(!Product){
        return  responseE(res , "product not found" , 400)
      }
      const newRatings = Product.ratings.filter((rating)=>{
        return rating.userID.toString()!== userID.toString()
      })
      Product.ratings=newRatings
      Product.save()
      responseM(res , " product review deleted successfully" , 200)
    })
  // Update Review
  const updateReview = wrapper(
    async (req, res)=>{
      const {star , review , reviewData , userID} = req.body
      const {id} = req.params
        // validation
        if(star < 1 || !review){
          responseE(res , "Pleas Add a star and review" , 400)
        }
        const Product = await product.findById(id)
        if(!Product){
          responseE(res , "product not found" , 400)
        }
    // match
    if(req.user._id.toString() !== userID){
      responseE(res , "user Not Authorized" ,401)
    }
    // update product review
    const updatedReview = await product.findOneAndUpdate(
      {
      _id : Product._id , 'ratings.userID' : mongoose.Types.ObjectId(userID) },
      {
        $set : {
          'ratings.$.star':star,
          'ratings.$.review':review,
          'ratings.$.reviewData':reviewData
        }
      }
    )
    if (updatedReview) {
      responseM(res , "Review Updated Successfully" , 200)
    }else{
      responseE(res , "Some Thing Went Wrong" , 400)
    }
    })
  export {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    reviewProduct,
    deleteReview,
    updateReview
  }