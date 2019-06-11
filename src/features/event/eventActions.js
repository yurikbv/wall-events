import { toastr } from "react-redux-toastr";
import * as event_type from './eventConstants';
import {asyncActionStart, asyncActionFinish, asyncActionError} from "../async/asyncActions";

export const fetchEvents = (events) => {
  return {
    type: event_type.EVENT_FETCH,
    payload: events
  }
};

export const createEvent = (event) => {
  return async dispatch => {
    try {
      dispatch({
        type: event_type.EVENT_CREATE,
        payload: {event}
      });
      toastr.success('Success!','Event has been created');
    }catch (e) {
      toastr.error('Oops','Something went wrong')
    }
  };
};

export const updateEvent = (event) => {
  return async dispatch => {
    try {
      dispatch({
        type: event_type.EVENT_UPDATE,
        payload: {event}
      });
      toastr.success('Success!','Event has been updated');
    }catch (e) {
      toastr.error('Oops','Something went wrong')
    }
  };
};

export const deleteEvent = (eventId) => {
  return {
    type: event_type.EVENT_DELETE,
    payload: {
      eventId
    }
  }
};

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let events = [];
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
    } catch (e) {
      console.log(e);
      dispatch(asyncActionError());
    }
  }
};