const {Router} = require('express');
const github = require('./github');

const router = Router();

const middleware = (req, res, next) => {
    // console.log('Get Github user');
    // console.log(req.params);
    githubId = req.params.id;
    // console.log(githubId);
    github.getGithub(githubId);
    next();
};

router.get('/user/:id', [middleware], (req, res) => {
    res.send(githubId);
});

router.post('/user/:id', (req, res) => {
    const data = req.body;
    // console.log(req.headers);
    res.send(data);
});

module.exports = router
