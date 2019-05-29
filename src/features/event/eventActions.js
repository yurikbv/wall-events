import * as event_type from './eventConstants';

export const createEvent = (event) => {
  return {
    type: event_type.EVENT_CREATE,
    payload: {
      event
    }
  }
};

export const updateEvent = (event) => {
  return {
    type: event_type.EVENT_UPDATE,
    payload: {
      event
    }
  }
};

export const deleteEvent = (eventId) => {
  return {
    type: event_type.EVENT_DELETE,
    payload: {
      eventId
    }
  }
};