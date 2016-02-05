var express  = require('express');
var app =  express();

var router = express.Router();

router.get("/home", function(req, res){
	res.send("Hello world");
});

app.use("/api", router);

app.listen(12345, function(){
	console.log("run  server!");
});
