const express  = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const _ = require("lodash");
const encrypt = require("mongoose-encryption");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const multer = require('multer');
let alert = require('alert'); 

app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");
});
app.get("/logincreator",function(req,res){
res.sendFile(__dirname+ "/Login-creator.html");
});
app.get("/logincompany",function(req,res){
res.sendFile(__dirname + "/Login-company.html");
});
app.get("/creatorform",function(req,res){
    res.sendFile(__dirname + "/creatorform.html");
    });
app.get("/companyform",function(req,res){
    res.sendFile(__dirname + "/companyform.html");
});

            
mongoose.connect('mongodb+srv://sinhaadesh123:Mqv95a3VIduAMfcl@cluster0.qc9feef.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
})
const storage = multer.diskStorage({
    destination:"public/images/",
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }

})
const allcomapanies =[];
const creatorSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    Instalink: String,
    Youtubelink: String,
    password: String,
    TypeofContent: String,
    Descryption: String,
    avatar: String
});
const sec = "Thisisourliitlesecret";
creatorSchema.plugin(encrypt,{secret:sec, encryptedFields:["password"]});
module.exports = creator = mongoose.model("creator",creatorSchema);

const upload = multer({
storage:storage
}).single('avatar');

app.post("/creatorsignup",(req,res)=>{
upload(req,res,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        const newcreator = new creator({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            Instalink: req.body.Instalink,
            Youtubelink: req.body.Youtubelink,
            password: req.body.password,
            TypeofContent: req.body.TypeofContent,
            Descryption: req.body.Descryption,
            avatar: req.file.filename
        });
        newcreator.save();
        
        company.find({}).then(function(items){
            res.render("creator-1",{y:newcreator,comp:items});
        });
    }
})
})

app.post("/creatorlogin",function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    // console.log(username);
    creator.findOne({username:username}).then(post=>{
        if(post===null){
            alert("Wrong Username");
            res.send;
           
        }
        else if(post.password===password){ 
        company.find({}).then(function(items){
            res.render("creator-1",{y:post,comp:items});
        });
        }
        else{
           alert("Wrong Crediantial");
        }
        });
});
const companySchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    TypeofContent: String,
    Descryption: String,
    avatar: String
    
});
companySchema.plugin(encrypt,{secret:sec, encryptedFields:["password"]});
module.exports = company = mongoose.model("company",creatorSchema);


app.post("/companysignup",(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            const newcompany = new company({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            TypeofContent: req.body.TypeofContent,
            Descryption: req.body.Descryption,
            avatar: req.file.filename
            });
            newcompany.save();
            console.log(newcompany.avatar);
            creator.find({}).then(function(items){
                res.render("company-1",{y:newcompany,comp:items});
            });
        }
    })
})
app.post("/companylogin",function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    // console.log(username);
    company.findOne({username:username}).then(post=>{
        if(post===null){
            alert("Wrong Username");
            res.send;
        }
        else if(post.password===password){
            creator.find({}).then(function(items){
                res.render("company-1",{y:post,comp:items});
            });
        }
        else{
            alert("Wrong Credentials");
        }
        });
});

app.post("/temp",function(req,res){
    console.log(req.body.Description);
    res.render("profile",{img:req.body.avatar,ul:req.body.ulink,il:req.body.ilink,n:req.body.name,e:req.body.email,c:req.body.cc,d:req.body.Description});
})
app.post("/temp2",function(req,res){
    console.log(req.body.Description);
    res.render("profilecompany",{img:req.body.avatar,ul:req.body.ulink,il:req.body.ilink,n:req.body.name,e:req.body.email,c:req.body.cc,d:req.body.Description});
})
app.listen(process.env.PORT||3000,function(){
    console.log("haa bhai kam gya");
});
// Ai9L6V2WquLRNmug
//Mqv95a3VIduAMfcl
