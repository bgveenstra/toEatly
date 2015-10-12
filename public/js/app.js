// CLIENT SIDE JAVASCRIPT

// On page load
$(document).ready(function(){
  pageLoad();
});

// function definitions

function pageLoad() {
  // set event listener for new food form
  $("#new-food-form").on("submit", function(e){
    // prevent form submission
    e.preventDefault();
    var form = this;
    addFood(form);
    // post serialized form to food#create
    // $.post("/api/foods", $(this).serialize(), function(response){
    //   // append new food to the page
    //   $("#food-ul").append($("<li class='list-group-item'>" + foodHTMLString + "</li>"));
    //   // getFoods();
    //   $("#new-food-form")[0].reset();
    // });
  });
}


function addFood(form){
  $.post("/api/foods", $(form).serialize(), function(response){
      console.log('add food response: ', response);
      // append new food to the page
      $("#food-ul").append($("<li class='list-group-item'>" + foodHTMLString(response) + "</li>"));
      // getFoods();
      $("#new-food-form")[0].reset();
    }); 
}
// function getFoods() {
//   $.get("/api/foods", function(response){ 
//     var foods = response.reverse();
//     // grab foods template
//     renderFoods(foods);
//   });
// }

// function renderFoods(foods) {
//   // clear content (for repeated use)
//   $("#food-ul").html("");
//   // loop over the foods and append to ul
//   for (var i=0; i<foods.length; i++) {
//     $("#food-ul").append("<li class='list-group-item'>" + foods[i].name + 
//       " <span class='label label-default'>"+foods[i].yumminess+"</span>" +
//       "<button data-id="+foods[i].id+" onclick='deleteFood(this)' type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
//       "</li>");
//   }
// }

function foodHTMLString(food){
  str = food.name + 
      " <span class='label label-default'>" + food.yumminess + " </span>" +
      " <button data-id='" + food.id + 
        "' onclick='deleteFood(this)' type='button' class='close' aria-label='Close'> " + 
        " <span aria-hidden='true'>&times;</span> " + 
      " </button> " +
      " <button data-toggle='collapse' data-target='#update-" + food.id + 
        "' aria-expanded='false' aria-controls='update-" + food.id + 
        "' class='update' aria-label='Update'> " + 
      "</button> " +
      "<form id='update-" + food.id + "'>" +
        ""
      "</form>";
  console.log("str: ", str);
  return str;
}

function deleteFood(context) {
  console.log(context);
  var foodId = $(context).data().id;
  $.ajax({
    url: '/api/foods/' + foodId,
    type: 'DELETE',
    success: function(response) {
      // once successful, delete this food from view
      $(context).closest('li').remove();
    }
  });
}

function updateFood(context) {
  console.log(context);
  console.log('updating food');
  var foodId = $(context).data().id;
  $.ajax({
    url: '/api/foods/' + foodId,
    type: 'PATCH',
    // @TODO: serialize form data!
    data: context.serialize(),
    success: function(response) {
      // once successful, change the food in the view
      var updated = foodHTMLString(response);
      console.log("updated", updated)
      $(context).closest('li').html(updated);
    }
  })
}
