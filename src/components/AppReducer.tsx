import { actionTypes } from "../types/reducerTypes";

const Reducer = (state: object, action: actionTypes) => {
  switch (action.type) {
    case "rotate":
      return action.payload.updated;
    case "sizes":
      return action.payload.sizes;
    default:
      return {
        ...state,
        count: 0,
        rotateToLeft: false,
        rotateToRight: false,
      };
  }
};
export default Reducer;
