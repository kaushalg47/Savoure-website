var express=require("express");
var router = express.Router();

const credential={
    email:"sih@gmail.com"

}

router.post('login',(req,res)=>{
  if(req.body.username==credential.email&&req.body.password==credential.password){
    req.session.user=req.body.username;
    //res.redirect('/home')
    res.end("login succesful");
  }else{
    res.end("invalid username")}
});