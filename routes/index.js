var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test',function(err){
    if(err){
        console.log("connect fail");
    }else{
        console.log("connect successfully")
    };

});
var usermodel=mongoose.model('userlogin',{
    username:{
        type:String,
        unique:true
    },
    displayname: {
        type:String
    },
    password:{
        type:String
    }

});
var profilemodel=mongoose.model('profile',{
    username:{
        type:String,
        unique:true
    },
    displayname: {
        type:String
    },
    photos:{
        type:String
    }

});

var userprofile={};

router.get('/',
    function(req, res) {
      //res.render('index', { user: req.user });
    });

router.get('/login',
    function(req, res){
        res.status(200).json({message:'login success'});
    });

router.post('/register',function(req,res){
    (new usermodel(req.body)).save(function(err,response){
        if(err) {
            res.status(500).json({message:"Creating was not successfully"});
            console.log("Something wrong");
        }else{
            res.redirect('/home').send(req.body);
        }
    });
});

router.get('/login/twitter',
    passport.authenticate('twitter'),function(req,res){
    });


router.get('/login/twitter/return',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/home');
    });

//router.get('/home',function(req,res){
//    console.log(req.body);
//});

router.get('/home',function(req,res){
    console.log(req.user);
    console.log("================");
    userprofile = {
        username:req.user.username,
        displayname:req.user.displayName,
        photos:req.user.photos[0].value,
    };
    (new profilemodel(userprofile)).save(function(err, response){
        if(err) {
            console.log(err);
            res.status(500).json({message:"can't connect to server"});
            console.log("Something wrong2");
        }else{
            res.render('home',{ title: "Main Page" , message:req.user.username});
        }
    })
    });

router.get('/profile:id',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
        console.log(req.params.id);
        profilemodel.find(req.params.id, function(err,response){
            if(err){
                res.status(500).json({message:"can't connect to server1"});
                console.log("Something wrong1");
            }else{
                res.status(200).json(response);
            }
        });
      });


module.exports = router;
