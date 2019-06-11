import { combineReducers } from 'redux';
import { reducer as FormRedcer } from 'redux-form';
import eventReducer from '../../features/event/eventReducer';
import modalReducer from '../../features/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';

const rootReducer = combineReducers({
  form: FormRedcer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer
});

export default rootReducer;