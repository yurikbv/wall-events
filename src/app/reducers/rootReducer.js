import { combineReducers } from 'redux';
import { reducer as FormRedcer } from 'redux-form';
import {reducer as toastrReducer} from "react-redux-toastr";
import eventReducer from '../../features/event/eventReducer';
import modalReducer from '../../features/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../../features/async/asyncReducer';

const rootReducer = combineReducers({
  form: FormRedcer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: toastrReducer
});

export default rootReducer;