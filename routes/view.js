var express = require('express');
var router = express.Router();
var path = require("path");

require('dotenv').config();
//Validating Routes
function validateRoute() {
    return (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect(process.env.APP_PATH + 'dashboard/login');
    }
}

// View Routes
router.get('/dashboard', validateRoute(), async (req, res) => {
    console.log("User ===> ", req.user);
    console.log("Role ===> ", req.session.role);
    console.log("Token ===> ", req.session.token);
    console.log("Logged in ===> ", req.isAuthenticated());

    res.render("dashboard", {
        projectName: process.env.PROJECT_NAME,
        showMenu: false,
        isAdmin: req.session.role,
        breadCrumbs: [{
            name: 'Dashboard',
            link: process.env.APP_PATH + 'dashboard'
        }]
        // listData: data.data,
        // count: data.tota
    });
});

router.get('/dashboard/collections', validateRoute(), async (req, res) => {
    console.log("User ===> ", req.user);
    console.log("Token ===> ", req.session.token);
    console.log("Logged in ===> ", req.isAuthenticated());

    res.render("pages/collections/collectionList", {
        projectName: process.env.PROJECT_NAME,
        showMenu: false,
        breadCrumbs: [{
            name: 'Dashboard',
            link: process.env.APP_PATH + 'dashboard'
        }, {
            name: 'Collections',
            link: process.env.APP_PATH + ''
        }]
    });
});

router.get('/dashboard/collection/new', validateRoute(), async (req, res) => {
    console.log("User ===> ", req.user);
    console.log("Token ===> ", req.session.token);
    console.log("Logged in ===> ", req.isAuthenticated());

    res.render("pages/collections/collectionNew", {
        projectName: process.env.PROJECT_NAME,
        showMenu: false,
        breadCrumbs: [{
            name: 'Dashboard',
            link: process.env.APP_PATH + 'dashboard'
        }, {
            name: 'Collections',
            link: process.env.APP_PATH + 'dashboard/collections'
        }, {
            name: 'New Collection',
            link: process.env.APP_PATH + ''
        }]
    });
});

router.get('/dashboard/login', (req, res) => {
    res.render("login", {
        showMenu: false
    });
})

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.render("login", {
        showMenu: false
    });
})

router.get('/register', (req, res) => {
    res.render("register", {
        showMenu: false
    });
})

module.exports = router;