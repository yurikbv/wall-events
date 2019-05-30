import React from 'react';
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetaledHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";



const EventDetailedPage = ({event}) => {
  return (
      event &&
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader event={event}/>
          <EventDetailedInfo event={event}/>
          <EventDetailedChat/>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={event.attendees}/>
        </Grid.Column>
      </Grid>
  );
};

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event ={};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }
  return {
    event
  }
};

export default connect(mapState)(EventDetailedPage);