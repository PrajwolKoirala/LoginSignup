


const express = require("express");
// const cors = require('cors');
require("./Config/Database");
const session = require('express-session');
// const fileUpload = require("express-fileupload");

const auth_route = require("./route/User")
const admin_route = require("./route/Admin")

require('dotenv').config()


const app = express();
const path = require('path');
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(cors({
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// }));

app.use(express.json());  // Parse JSON data//global middleware
app.use(express.urlencoded({ extended: true }));  // Parse 
app.use(session({
  secret: 'yourSecretKeyHere', 
  resave: false,
  saveUninitialized: false
}));
// app.use(fileUpload());//we can read data sent from form-data


app.use("/api", auth_route);
app.use("/api", admin_route);



app.use((req,res) => {
  res.status(404).send({
    msg:"Resoursce not found"
  })
})

app.use((err,req,res,next) => {
  let status = 500;
  let msg = "SERVER error";
  let errors = [];
  if (err.name === "ValidationError"){
    status = 400;
    msg = "bad request"
    
    let error_arr = Object.entries(err.errors)
    let temp = []
    error_arr.forEach(el => {
        let obj = {}
        obj.params = el[0]
        obj.msg = el[1].message
        temp.push(obj)
    }); 
    errors = temp;
}
res.status(status).send({msg: msg , errors,error:err.message})
return;
})




app.listen(8000, () => {
    console.log("Server started");
});
