var Map = require("immutable").Map;

var reducer = function(state = [], action) {
  switch (action.type) {
    case "SET_USER":
        return action.user
  }
  return state;
}
module.exports = reducer;
