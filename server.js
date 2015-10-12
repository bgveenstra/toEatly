// SERVER SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser"),
    where = require("./utils/where");


// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use("/static", express.static("public"));
// body parser config to accept all datatypes
app.use(bodyParser.urlencoded({ extended: true }));

// DATA //
var foods =[
  {id: 0, name: "Sushiritto", yumminess: "quite"},
  {id: 1, name: "Green Eggs & Ham", yumminess: "sure"},
  {id: 2, name: "Crayfish", yumminess: "depending"},
  {id: 3, name: "Foie Gras", yumminess: "omg"},
  {id: 4, name: "Kale", yumminess: "meh"}
];

// ROUTES //
app.get("/", function (req, res){
  // render index.html with foods data 
  res.render('index', {foods: foods});
});

// foods api path
app.get("/api/foods", function (req, res){
  // render foods data as JSON
  res.json(foods);
});

app.post("/api/foods", function (req, res){
  var newFood = req.body;
  // add a unique id
  if (foods.length){
    // id will be either one more than current last id...
    newFood.id = foods[foods.length - 1].id + 1;
  } else {
    // ... or will be 0 if foods array is currently empty
    newFood.id = 0;
  }
  
  // add new food to DB (array, really...)
  foods.push(newFood);
  // send a response with newly created object
  res.json(newFood);
});

app.delete("/api/foods/:id", function (req, res){
  // set the value of the id
  var targetId = parseInt(req.params.id);
  // find item in the array matching the id
  var targetItem = where(foods, {id: targetId});
  // get the index of the found item
  var index = foods.indexOf(targetItem);
  // remove the item at that index, only remove 1 item
  foods.splice(index, 1);
  // render deleted object
  res.json(targetItem);
});

app.patch("/api/foods/:id", function (req, res){
  // set the value of the id
  var targetId = parseInt(req.params.id);
  // find item in the array matching the id
  var targetItem = where(foods, {id: targetId});
  if (targetItem){
    // use the data in the form body to change the item
    targetItem.name = req.body.name || targetItem.name;
    targetItem.yumminess = req.body.yumminess || targetItem.yumminess;
    // send back updated item data
    res.status(200).json(targetItem);
  } else {
    res.status(404).send('target item not found for id ' + req.params.id);
  }
})

app.listen(3000, function (){
  console.log("listening on port 3000");
});