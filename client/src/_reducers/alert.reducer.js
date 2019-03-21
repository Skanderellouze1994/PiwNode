import { alertConstants } from '../_constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'bg-success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'bg-danger',
        message: action.message
      };
    case alertConstants.PASSWORD:
      return {
        type: 'bg-danger',
        message: "Username and Password invalid"
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}