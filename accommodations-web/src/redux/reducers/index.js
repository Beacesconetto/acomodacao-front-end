import { combineReducers } from 'redux';
import accommodationReducer from './accommodationSlice';

const rootReducer = combineReducers({
  accommodations: accommodationReducer,
});

export default rootReducer;