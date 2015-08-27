// On page load
$(function() {
  pageLoad();
});

// function definitions

function pageLoad() {
  // load foods
  getFoods();
  // set event listeners
  $("#new-food-form").on("submit", function(e){
    // prevent form submission
    e.preventDefault();
    // post to food#create
    $.post("/foods", $(this).serialize())
      .done(function(res){
        // append new food to the page
        getFoods();
        $("#new-food-form")[0].reset();
      });
  });
}

function getFoods() {
  $.get("/foods", function(res){ 
    var foods = res.reverse();
    // grab foods template
    template = _.template($("#foods-template").html());
    // input foods into template and append to parent
    foodItems = foods.map(function(food) {
      return template(food);
    });
    // clear content (for repeated use)
    $("#food-ul").html("");
    // append foods to ul
    $("#food-ul").append(foodItems);
  });
}
