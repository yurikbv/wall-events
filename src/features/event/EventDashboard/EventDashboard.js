import React, {Component} from 'react';
import { connect } from "react-redux";
import { Grid } from 'semantic-ui-react';
import EventList from "../EventList/EventList";
import {deleteEvent} from "../eventActions";

class EventDashboard extends Component {

  handleDeleteEvent = (eventId) => () => {
    this.props.dispatch(deleteEvent(eventId))
  };

  render() {

    const {events} = this.props;

    return (
        <Grid>
          <Grid.Column width={10}>
            <EventList
                events={events}
                deleteEvent={this.handleDeleteEvent}
            />
          </Grid.Column>
          <Grid.Column width={6}>

          </Grid.Column>
        </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {events: state.events}
};

export default connect(mapStateToProps)(EventDashboard);