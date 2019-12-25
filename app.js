var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var passport  = require("passport")
var FacebookStrategy = require("passport-facebook");

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs")

passport.use(new FacebookStrategy({
    clientID:'579687592577147',
    clientSecret:'cbfe7c20841daa9007669a581d13c113',
    profileFields:['name','email','picture'],
    callbackURL:'http://127.0.0.1:8080/auth/facebook/callback'
},
    (accessToken,refreshToken,profile,done)=>{
        console.log(profile);
        done(null,profile)
    }
))

app.get("/auth/facebook",
    passport.authenticate('facebook')
);

app.get("/auth/facebook/callback",
    passport.authenticate('facebook',{ failureRedirect:'/login'}),
    (req,res)=>{
        res.redirect('/');
    }
)

app.get("/login",(req,res)=>{
    res.send({
        message:"Login.............."
    })
})

app.get("/test",(req,res)=>{
    res.send({
        message:"Testing...."
    })
})

app.get("/",(req,res)=>{
    res.render("./main")
})
app.listen(8080,()=>{
    console.log("Server on..")
})