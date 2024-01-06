
var jwt = require('jsonwebtoken');
// const Joi = require('joi');
const Admin = require ("../model/Admin");
const bcrypt = require("bcrypt");
const User = require ("../model/User");
const session = require('express-session');



    const AdminSignup = async (req, res, next) => {
        try {
            const hash_pw = await bcrypt.hash(req.body.password, 10);
            const newUser  =  new Admin({ 
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
    
 



// const Adminlogin = (async(req, res) => {
  
//    let user = await Admin.findOne({email:req.body.email})
//    console.log(user);
   
//    if(user){

    

//     let status = await bcrypt.compare(req.body.password,user.password );
//     if(status){
        
//         //hiding password:
//         let obj = {...user.toObject()}
//         var token = jwt.sign(obj, process.env.JWT_SECRET);
//         delete obj.password


//         return res.send({data:obj, token})
//     }



// }
   
  
//    return res.status(401).send({msg:"unauthenticated"})
   
   
  
// })
const Adminlogin = async (req, res) => {
    try {
        console.log('Login endpoint called');

        const user = await Admin.findOne({ email: req.body.email });

        if (!user) {
            console.log('Invalid credentials');
            return res.status(401).send({ msg: "Invalid credentials" });
        }

        const status = await bcrypt.compare(req.body.password, user.password);

        if (status) {
            console.log('Authentication successful');
            const obj = { ...user.toObject() };
            const token = jwt.sign(obj, process.env.JWT_SECRET, { expiresIn: '1h' }); // Set expiry time for the token
            delete obj.password;
            req.session.isAdmin = true;
            console.log('Token generated');
            return res.send({msg:"you are a admin", data: obj, token });
            
        }

        console.log('Authentication failed');
        return res.status(401).send({ msg: "Invalid credentials" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ msg: "Internal server error" });
    }
};




const getUser = async (req, res, next) => {
    // try {
    //   const token = req.headers.authorization;
  
    //   if (!token || !token.startsWith('Bearer ')) {
    //     return res.status(401).send({ msg: 'Unauthorized: No token provided' });
    //   }
  
    //   const tokenValue = token.split(' ')[1];
  
    //   try {
    //     const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET);
    //     const user = await User.findById(decodedToken._id);
    //     console.log('Decoded user ID:', decodedToken._id);

    //     if (!user) {
    //       return res.status(401).send({ msg: 'Unauthorized: User not found' });
    //     }
  
    //     // Return the user information
    //     return res.send({ user });
    //   } catch (err) {
    //     console.error(err);
    //     return res.status(401).send({ msg: 'Unauthorized: Invalid token' });
    //   }
    // } catch (err) {
    //   next(err);
    // }


        try {
         
          const users = await User.find({}, '-password'); // Excluding password for security
      
          return res.status(200).send({ users });
        } catch (error) {
          return res.status(500).json({ error: 'Internal server error' });
        }
      }
  
      const update = async (req, res, next) => {
        const userId = req.params.id;
        const updateData = req.body;
    
        console.log("Updating user with ID:", userId);
    
        try {
            const updateUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    
            if (!updateUser) {
                return res.status(404).send({ msg: "User not found" });
            }
    
            res.send({ user: updateUser });
        } catch (err) {
            next(err);
        }
    };

    const remove = async (req, res, next) => {

        let user = await User.findById(req.params.id)
        if(user){
         await User.findByIdAndDelete(req.params.id)
         return res.status(204).send({ msg: "user deleted successfully" }).end()
        }
        res.status(404).send("resource not found")
        
      
      };


module.exports = {
    AdminSignup,
    Adminlogin,
    getUser,
    update,
    remove
}