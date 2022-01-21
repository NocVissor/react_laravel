var Map = require("immutable").Map;

var reducer = function(state = [], action) {
  switch (action.type) {
    case "SET_STATE":
        return state.merge(action.state);
    case "SET_USER":
        return {
            ...state,
            user: action.user
        }
    case "SET_CODE":
        return {
            ...state,
            code: action.code
        }
  }
  return state;
}
module.exports = reducer;
