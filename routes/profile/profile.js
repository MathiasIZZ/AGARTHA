const express = require('express')
const router = express.Router();
const axios = require('axios')
const multer = require('multer');
const path = require('path')

const upload = multer({
    dest: path.join(__dirname, '/upload'),
    filename: (req, file, cb) => {
        cb(null, `${ Date.now() }-${ file.originalname } `)
    }
});

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
router.post('/changeavatar', upload.single('avatar'), async (req, res) => {

    axios.post('https://api.agartha.pro/user/update_avatar/', {
        auth: {
            username: 'mathious@agartha.pro',
            password: 'motdepassedifficile'
        },
        avatar: req.file

    }).then( data => console.log(data));


    console.log(req.file);
    res.end();
})



module.exports = router;
