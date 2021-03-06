import React, {Component} from 'react';
import { connect } from "react-redux";
import { Grid } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import EventList from "../EventList/EventList";
import {deleteEvent} from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";

class EventDashboard extends Component {

  handleDeleteEvent = (eventId) => () => {
    this.props.dispatch(deleteEvent(eventId))
  };

  render() {

    const {events,loading} = this.props;
    if (loading) return <LoadingComponent inverted={true}/>;
    return (
        <Grid>
          <Grid.Column width={10}>
            <EventList
                events={events}
                deleteEvent={this.handleDeleteEvent}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <EventActivity/>
          </Grid.Column>
        </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.firestore.ordered.events,
    loading: state.async.loading
  }
};

export default connect(mapStateToProps)(firestoreConnect([{collection: 'events'}])(EventDashboard));