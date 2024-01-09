import mongoose from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , "pleas add a name"],
    },
    email:{
        type:String,
        required:[true , "pleas add a email"],
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:[true , "pleas add a password"],
        minLength:[6,"password must  be up to 6 character"]
    },
    role:{
        type:String,
        default:"customer",
        enum:["customer","admin"]
    },
    photo:{
        type:String,
        default:"profile.png"
    },
    phone:{
        type:String,
        default:"+20"
    },
    address:{
        type:String,
    },
    state:{
        type:String,
    },
    country:{
        type:String,
    },
},{
  timestamps: true
});

//Export the model
const User = mongoose.model('User', userSchema);

export default User;