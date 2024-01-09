import multer from 'multer'

const diskStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null,'./uploads')
  },
  filename (req,file,cb){
    const ext = file.mimetype.split("/")[1]
    const fileName = `user-${Date.now()}.${ext}`
    cb(null , fileName)
  }
})
const fileFilter = (req,file,cb) => {
const imageTypr = file.mimetype.split("/")[0]
if (imageTypr === "image") {
  return cb(null , true)
}else{
  return cb(appError.create( "The File Must Be An Image" , 400 ,{ ...FAIL}) , false)
}
}
const upload = multer({
  storage: diskStorage,
  fileFilter
})

export default upload