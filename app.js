var express  		= require('express');
var app 			= express();
var mongoose 		= require('mongoose');
var bodyParser  	= require('body-parser');
var db 				= require('./model/db.js');
var CourseModel 	= require('./model/Courses.js');
var router 			= express.Router();

// Initiazation

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// DB Connection
router.get('/', function(req,res) {
	res.send('Index');
});

router.get("/home", function(req, res){
	res.send("Hello world");
});

router.get("/show/:id", function(req, res){
	var Course = new CourseModel();
	// changed from req.body.id to
	// req.params.id
	// because of we get :id router not form submit
	var req_id = req.params.id;
	Course.findById(req_id,function(err, data){
		console.log(data);
	})
});

router.post("/create", function(req, res) {
	var CourseName = req.body.name;
	var CourseDesc = req.body.description;
	var CourseStart = req.body.start_date;
	var data = {
		name: CourseName,
		description: CourseDesc/*,
		start_date: CourseStart*/
	}
	var Courses = new CourseModel(data);
	Courses.save(function(err, data){
		if(!err) {
			res.json({
				course_id: data._id,
				status: 'success',
			});
		}
	});
});

app.use("/", router);



app.listen(1234, function(){
	console.log("run  server!");
});
