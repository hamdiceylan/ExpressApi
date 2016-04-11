// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan      = require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

var Bear  = require('./app/models/bear');
var Milonga  = require('./app/models/milonga');
var User   = require('./app/models/user'); // get our mongoose model



var mongoose   = require('mongoose');
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

mongoose.connect(config.database, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
    // Wait for the database connection to establish, then start the app.
});


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

var port = process.env.PORT || 8080;        // set our port
app.set('superSecret', config.secret); // secret variable


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods" , "GET,POST,PUT,DELETE,OPTIONS");

    next(); // make sure we go to the next routes and don't stop here
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)

router.post('/authenticate', function(req, res) {

    // find the user
    User.findOne({
        name: req.body.name
    }, function(err, user) {
        console.log(user);

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
});

app.get('/setup', function(req, res) {

    // create a sample user
    var nick = new User({
        name: 'hamdi',
        password: '123',
        admin: true
    });

    // save the sample user
    nick.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});

// route to return all users (GET http://localhost:8080/api/users)
router.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        debugger;
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)
        bear.surname = req.body.surname;  // set the bears name (comes from the request)
        bear.age = req.body.age;  // set the bears name (comes from the request)
    
        console.log(bear);
        // save the bear and check for errors
        bear.save(function(err) {
            console.log(err);
            if (err){
                res.send(err);
                console.log(err);
            }
            res.json({ message: 'Bear created!' });
        });

    })
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

    // use our bear model to find the bear we want
    Bear.findById(req.params.bear_id, function(err, bear) {

        if (err)
            res.send(err);

        bear.name = req.body.name;  // update the bears info

        // save the bear
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear updated!' });
        });

    });
})
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// more routes for our API will happen here

//Milonga Routes
router.route('/milonga')
    .post(function(req, res) {
        var milonga = new Milonga();
        milonga.Name = req.body.Name;
        milonga.Day = req.body.Day;
        milonga.Description = req.body.Description;
        milonga.Address  = req.body.Address;
        milonga.Organizer = req.body.Organizer;
        milonga.CreateDate = req.body.CreateDate;
        milonga.ImageUrl = req.body.ImageUrl;
        milonga.Location = req.body.Location;

        milonga.save(function(err) {
            console.log(err);
            if (err){
                res.send(err);
                console.log(err);
            }
            res.json({ message: 'Milonga created!' });
        });

    })
    .get(function(req, res) {
        Milonga.find(function(err, milongas) {
            if (err)
                res.send(err);

            res.json(milongas);
        });
    });

router.route('/milonga/:milonga_id')
    .delete(function(req, res) {
        Milonga.remove({
            _id: req.params.milonga_id
        }, function(err, milonga) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
