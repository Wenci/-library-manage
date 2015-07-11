var express = require('express');
var router = express.Router();


router.get('/',function(req,res){

	res.cookie('lo',"",{path:'/',maxAge:0,httpOnly: true});
	res.cookie('uname',"",{path:'/',maxAge:0,httpOnly: true});
	res.cookie('lok',"",{path:'/',maxAge:0,httpOnly: true});
	req.session.destroy();

	res.redirect('/login');
	
});





module.exports = router;