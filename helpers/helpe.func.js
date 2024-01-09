const catchErr = (res , err ,funcName) =>{
  res.status(500).json({messaeg: err.message})
  console.log(`💥Error in❌🔜 ${funcName}:` , {err})
}

const responseE = (res, msg  , code , data)=>{
  msg = (typeof msg !== 'undefined') ? msg : "";
  data = (typeof data !== 'undefined') ? data : "";
  code = (typeof code !== 'undefined') ? code : 400;
return res.status(code).json({error : msg , data})
}
const responseM = (res, msg  , code , data)=>{
  msg = (typeof msg !== 'undefined') ? msg : "";
  data = (typeof data !== 'undefined') ? data : "";
  code = (typeof code !== 'undefined') ? code : 400;
return res.status(code).json({message : msg , data})
}

const  wrapper = (func , funcName) => {
  return ( req , res)=>{
      func( req , res)
      .catch((e)=>{catchErr(res , e , funcName)})
  }
}

// module.exports = (asyncFn) => {
//   return (req , res , next) =>{
//     asyncFn(req , res , next)
//     .catch((err)=>{
//       next(err)
//     })
//   }
// }

export{
  catchErr,
  responseM,
  wrapper,
  responseE
}