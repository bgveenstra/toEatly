// search through an array of objects and return
// the last one that matches all of the key-value pairs
// given in the properties argument.

function where(arr, properties){
  var output;
  var obj;
  for (var i=0; i<arr.length; i++){
    obj = arr[i];
    for (var key in obj){
      if (obj.hasOwnProperty(key) && obj[key] === properties[key]){
          output = obj;
      }
    }
  }
  return output;
}


// The module.exports object will be available 
// outside this file through node's require method.
// Here we just set this file's  module.exports to be the where function.
module.exports = where;
