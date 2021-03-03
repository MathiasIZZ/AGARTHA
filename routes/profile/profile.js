const express = require('express')
const router = express.Router();
const axios = require('axios')

router.get('/', (req, res) => {

    axios.get('https://api.agartha.pro/user/get/', {
        auth: {
            username: 'mathious@agartha.pro',
            password: 'motdepassedifficile'
        }
    }).then( (data) => {
        const profil_infos = data.data[0];

        /*res.cookie('key', 456, {
            domain: ''
        });*/

        console.log(profil_infos)

        res.render('profile', { profil_infos });
    })
});

router.get('/avatar', (req, res) => {
    console.log('page avatar')

    res.render('user-avatar');
});

router.post('/changeavatar', (req, res) => {

    console.log(req.body);
    res.end();
})



module.exports = router;
