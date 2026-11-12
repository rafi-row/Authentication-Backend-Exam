const secureapi =(req,res,next)=>{
    
    if(req.headers.authorization=="hfdbsgvkhsfdbg4i5y3@#$49386fghkrafi"){
        next()
    }else{
      return res.send({error:"Authentication Failed"})
    }
    

}
module.exports = secureapi