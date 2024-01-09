import User from '../model/user.model.js'
import { responseE, responseM, wrapper } from '../helpers/helpe.func.js';
import becrypt from 'bcryptjs'
import generateTokenAndSetcookie from '../utils/generateTokenAndSetcookie.js';
import  Jwt  from 'jsonwebtoken';

// Register User
const registerUser = wrapper ( 
  async(req , res)=>{
    const { name , email , password  } = req.body;

    // Global Vaildation
    if (!name || !email || !password) return responseE(res,'Please fill all fields') ;
    // Email Vaildation
    const userExists = await User.findOne({email})
    if(userExists){
    return  responseE(res , "Sorry This User Is Already Exists")
    }
  // Password Vaildation
    if(password.length < 6){
    return  responseE(res , "Password must be up to 6 characters")
  }
  // Hashed Password
  const salt = await becrypt.genSalt(10)
  const hashedpassword = await becrypt.hash(password , salt)
  // Create User
    const newUser  = new User({
      name,
      email,
      password : hashedpassword,
      // photo: req.file.filename
    })
      await newUser.save()
  // Create Toekn
    generateTokenAndSetcookie(newUser._id , res)
  // Final Check
    if(newUser){
    return  responseM(res , "User Has Been Created Successfully ✔️" , 201 , {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      phone: newUser.phone,
      // photo: req.file.filename
    })
    }else{
    return  responseE(res , "Something went wrong")
    }
  },"registerUser"
  )
// Login User
const loginUser = wrapper (
  async(req , res)=>{
    const { email , password } = req.body;
    // Global Vaildation
    if(!email || !password) return responseE(res , 'Please Fill All Fields');
    // Find The User By Email
    let user = await User.findOne({email});
    if(!user){
      return responseE(res , 'Invalid You Email ');
      }
    // Compare Passwords
      const validPassord = await becrypt.compare(password , user.password);
      if (!validPassord) {
        return responseE(res , 'Invalid You Password')
      }
    // Generate Token And Set Cookie
      generateTokenAndSetcookie(user._id , res)
    // Return Data
    if(user){
      return responseM(res , `Welcome ${user.name}`, 200 , {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo,
        phone: user.phone
        });
    }else{
      return responseE(res , "Something Went Wrong");
    }
        },'loginUser'
  )
//logout
const logOut=wrapper(
async  (req,res)=> {
  res.clearCookie('jwt');
  return responseM(res,'Logout Successfuly',200);
  },'logOut'
)
// get user
const getUser = wrapper(
  async (req , res) => {
    const users = await User.findById(req.user._id).select("-password")
    return responseM(res , "Successfully Get Users", 200 , users);
      },'getAllUsers'
  )
// get login status
const isLoginStatus = wrapper(
    async (req , res) => {
        const token = req.cookies['jwt'];
        if (!token) { return res.json(false)};
        const decoded = Jwt.verify(token , process.env.JWT_SECRET);
        if(decoded){res.json(true)}else{return res.json(false)}
          },'isLoginStatus'
  )
// update user 
const updateProfile = wrapper(
  async (req , res) => {
    let data = req.body;
  // Password Vaildation
    if(data.password){
      if(data.password.length < 6){
        return  responseE(res , "Password must be up to 6 characters")
      }
      data.password = becrypt.hashSync(data.password , 10);
    }
      const updatedUser = await User.updateOne({_id : req.user._id},{$set : data});
      // const updatedUser = await User.updateOne({_id : req.user._id},{$set : data});
    if(!updatedUser){
      return responseE(res,"Failed To Update Profile");
      }
    else{
    return responseM(res,"Updated Successfuly",200);
    }
    },'updateProfile'
  );
// update Photo 
const updatePhoto = wrapper(
  async (req , res) => {
    let ph = req.file.filename;
      const updatedUser = await User.updateOne({_id : req.user._id},{ photo:ph});
    if(!updatedUser){
      return responseE(res,"Failed To Update Profile");
      }
    else{
    return responseM(res,"Updated Successfuly",200);
    }
    },'updateProfile'
  );
export {
  registerUser,
  loginUser,
  logOut,
  getUser,
  isLoginStatus,
  updateProfile,
  updatePhoto
}