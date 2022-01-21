var Map = require("immutable").Map;

var reducer = function(state = [], action) {
  switch (action.type) {
    case "SET_CODE":
        return action.code

  }
  return state;
}
module.exports = reducer;
