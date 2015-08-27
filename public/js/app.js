// On page load
$(function() {
  getFoods();
});

// Function definitions
function getFoods() {
  $.get("/foods", function(res){ 
    var foods = res;
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
