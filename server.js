
// require() allows you to include packages to your project
// use() to connect the app 

/* Empty JS object to act as endpoint for all routes */
let projectData = {};

// Express to run server and routes
const express = require('express');

// start up an instance of app
const app = express();


// Dependencies
const bodyParser = require('body-parser');

// Middleware 
// here we are configuring express to use body-parser as middle-ware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors for cross origin allowance
const cors = require('cors');
app.use(cors());


/* Initializing the main project folder */
app.use(express.static('website'));

const port = 8000;

const server = app.listen(port, () => { console.log(`server running on localhost: ${port}`); })

app.post('/addData', addData);
function addData(req, res) {
    projectData = req.body;
    // console.log(projectData);
}

app.get('/all', function(req, res) {
    res.send(projectData);
})