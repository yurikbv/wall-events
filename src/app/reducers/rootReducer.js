import { combineReducers } from 'redux';
import { reducer as FormRedcer } from 'redux-form';
import eventReducer from '../../features/event/eventReducer';

const rootReducer = combineReducers({
  form: FormRedcer,
  events: eventReducer
});

export default rootReducer;