var User= require('../models/user');

//-------------------------Get all users------------------------//
/* This function is used to get every user from database */
exports.user_get = function(req, res) {
    User.find()
    .sort({time_stamp:-1})
    .then(function (list_users) {
        res.status(200)
        .render('users', { user_list: list_users });
      }).catch((err) => {
        res.status(500).json({
            success:false,
            message:err
        }); 
      });
};

//---------------------Create new User---------------------//
/* This function is used to create a new user.*/
exports.user_create = function(req, res) 
{   
    let user = new User(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            introduction: req.body.introduction,
            phone: req.body.phone,
            achievements: req.body.achievements,
            experience: req.body.experience
        });
    user.save()
    .then((newUser) =>{
        res.status(200)
        .redirect('/');
    })
    .catch((err) => {
        res.status(500).json({
            success:false,
            message:err
        });
    });
 };

//---------------------Fetch User Details---------------------//
/* This function is used to fetch details of a particular user.*/
 exports.user_details_get = function(req, res) {
    User.findById(req.body.id)
        .then(function (user_details) {
            if(user_details){
                res.status(200)
                .render('user_detail', { user_data: user_details });
            }
            else{
                res.status(400).json({
                success:false,
                message:"User does not exist"
                });
            } 
        }).catch((err) => {
            res.status(500).json({
                success:false,
                message:err
            });      
        });
};

//----------------------------User Page-----------------------//
/* This function is used to load user details of the requested user.*/
exports.user_data_get = function(req, res) {
    console.log('here')
    User.findById(req.params.id)
    .then(function(user_details){
         res.status(200).json({
             success:true,
             data:user_details
             });
             console.log('here')
         }).catch((err)=>{
             res.status(500).json({
              success:false,
              message:err,
             }); 
            }); 
 };