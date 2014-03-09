module.exports = function(input){
  if (input) {
    return new Date(input);
  }
  return null;
};