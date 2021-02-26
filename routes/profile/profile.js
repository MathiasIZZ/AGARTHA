const express = require('express')
const router = express.Router();
const axios = require('axios')

router.get('/', (req, res) => {

    const data = axios.get('https://api.agartha.pro/user/get/', {
        auth: {
            username: 'mathious@agartha.pro',
            password: 'motdepassedifficile'
        }
    }).then( (data) => {
        console.log(data)
    })

    res.render('profile', { data } );







});



module.exports = router;
