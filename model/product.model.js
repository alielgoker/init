import mongoose from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true
    },
    sku:{
        type:String,
        required:true,
        default:"SKU",
        trim: true
    },
    category:{
        type:String,
        required:true,
        trim: true
    },
    brand:{
        type:String,
        required:true,
        trim: true
    },
    color:{
        type:String,
        required:true,
        default:"As seen",
        trim: true
    },
    Quantity:{
        type:Number,
        required:true,
        trim: true
    },
    sold:{
        type:Number,
        default:0,
        trim: true
    },
    regularPrice:{
        type:Number,
        trim: true
    },
    price:{
        type:Number,
        required:true,
        trim: true
    },
    description:{
        type:String,
        required:true,
        trim: true
    },
    image:{
        type:[String],
    },
    ratings:{
        type:[Object],
    },
},{
  timestamps: true
}
);

//Export the model
const Product = mongoose.model('Product', productSchema );
export default Product