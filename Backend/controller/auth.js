
var jwt = require('jsonwebtoken');
// const Joi = require('joi');
const User = require ("../model/User");
const bcrypt = require("bcrypt");



    const signup = async (req, res, next) => {
        try {
            const hash_pw = await bcrypt.hash(req.body.password, 10);
            const newUser  =  new User({ 
                name: req.body.name,
                email: req.body.email,
                password: hash_pw
            });
            const user = await newUser.save();
            res.send(user);
        } catch (err) {
            next(err);
        }
    };
    
 



const login = (async(req, res) => {
  
   let user = await User.findOne({email:req.body.email})
   console.log(user);
   
   if(user){

    

    let status = await bcrypt.compare(req.body.password,user.password );
    if(status){
        
        //hiding password:
        let obj = {...user.toObject()}
        var token = jwt.sign(obj, process.env.JWT_SECRET);
        delete obj.password


        return res.send({data:obj, token})
    }



}
   
  
   return res.status(401).send({msg:"unauthenticated"})
   
   
  
})


// const getuser = async (req, res,next) => {
//     try {
//         const token = req.headers.authorization;

//         if (!token) {
//             return res.status(401).send({ msg: "Unauthorized: No token provided" });
//         }
//         console.log("Received token:", token);

//         try {
//             const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//             const user = await User.findById(decodedToken._id);

//             if (!user) {
//                 return res.status(401).send({ msg: "Unauthorized: Invalid token" });
//             }

//             // You have the user information here
//             return res.send({ user });
//         } catch(err) {
//             console.error(err);
//             return res.status(401).send({ msg: "Unauthorized: Invalid token" });
//         }
//     } catch (err) {
        
//         next(err);
//     }
// };



module.exports = {
    signup,
    login,
}