var Map = require("immutable").Map;

var reducer = function(state = Map(), action) {
  switch (action.type) {
    case "SET_STATE":
        return state.merge(action.state);
    }
    return state;
}
module.exports = reducer;
