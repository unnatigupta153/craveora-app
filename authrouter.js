const router = require('express').Router();
const{ signup } = require('../controllers/authcontroller');
const {signupvalidation,loginvalidation} = require('../middlewares/authvalidation');
router.post('/login',loginvalidation,(req,res)=>{
    res.send('login success');
});

router.post('/signup', signupvalidation, signup);

module.exports = router;