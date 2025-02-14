import { combineReducers } from 'redux';
import accommodationReducer from './accommodationReducer';

const rootReducer = combineReducers({
  accommodations: accommodationReducer,
});

export default rootReducer;