var Map = require("immutable").Map;

var reducer = function(state = [], action) {
  switch (action.type) {
    case "SET_STATE":
        return state.merge(action.state);
    case "ADD_PHONE":
        return {
            ...state,
            phones: state.phones.concat(action.phone)
        }
    case "DELETE_PHONE":
        return {
            ...state,
            phones: state.phones.filter(
                (item) => item !== action.phone
            )
        };
  }
  return state;
}
module.exports = reducer;
