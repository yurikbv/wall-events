import React, {Component} from 'react';
import cuid from 'cuid';
import { Grid, Button } from 'semantic-ui-react';
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";



class EventDashboard extends Component {

  state = {
    events: eventsDashboard,
    isOpen: false,
    selectedEvent: null
  };

  handleFormOpen = () => {
    this.setState({selectedEvent: null, isOpen: true});
  };

  handleFormCancel = () => {
    this.setState({isOpen: false});
  };

  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    const updatedEvents = [...this.state.events, newEvent];
    this.setState({events: updatedEvents, isOpen: false});
  };

  handleOpenEvent = (eventToOpen) => () => {
    this.setState({ selectedEvent: eventToOpen, isOpen: true })
  };

  handleUpdateEvent = (updatedEvent) => {
    this.setState({
      events: this.state.events.map(event => {
        return event.id === updatedEvent.id ? Object.assign({}, updatedEvent) : event
      }) ,
      isOpen: false,
      selectedEvent: null
    })
  };

  handleDeleteEvent = (eventId) => () => {
    const updatedEvents = this.state.events.filter(event => event.id !== eventId);
    this.setState({events: updatedEvents})
  };

  render() {
    const {events, isOpen, selectedEvent} = this.state;

    return (
        <Grid>
          <Grid.Column width={10}>
            <EventList
                events={events}
                onEventOpen={this.handleOpenEvent}
                deleteEvent={this.handleDeleteEvent}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Button positive content="Create Event" onClick={this.handleFormOpen}/>
            {isOpen &&
            <EventForm
                selectedEvent={selectedEvent}
                handleCancel={this.handleFormCancel}
                createEvent={this.handleCreateEvent}
                updateEvent={this.handleUpdateEvent}
            />}
          </Grid.Column>
        </Grid>
    );
  }
}

export default EventDashboard;