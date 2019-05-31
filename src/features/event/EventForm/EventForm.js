/*global google*/
import React, {Component} from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from "react-redux";
import cuid from 'cuid';
import { reduxForm, Field} from 'redux-form';
import {combineValidators, composeValidators, isRequired, hasLengthGreaterThan} from 'revalidate';
import moment from 'moment'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import Script from "react-load-script";


import { createEvent, updateEvent} from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";

const category = [
  {key: 'drinks', text: 'Drinks', value: 'drinks'},
  {key: 'culture', text: 'Culture', value: 'culture'},
  {key: 'film', text: 'Film', value: 'film'},
  {key: 'food', text: 'Food', value: 'food'},
  {key: 'music', text: 'Music', value: 'music'},
  {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired({message: 'Please provide a category'}),
  description: composeValidators(
      isRequired({message: 'Please enter a description'}),
      hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
});

class EventForm extends Component {

  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  };

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
        .then(results => getLatLng(results[0]))
        .then(latlng => {
          this.setState({
            cityLatLng: latlng
          });
        })
        .then(() => {
          this.props.change('city', selectedCity)
        })
  };

  onFormSubmit = values => {
    values.date = moment(values.date).format();
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Bob'
      };

      this.props.createEvent(newEvent);
      this.props.history.push('/events')
    }
  };

  handleScriptLoaded = () => this.setState({scriptLoaded: true});


  render() {
    const {invalid, submitting, pristine} = this.props;
    return (
        <Grid>
          <Script
              url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXfE3wOacfYwI5NrIg2K4LWqn6Fq_iaJg&libraries=places"
              onLoad={this.handleScriptLoaded}
          />
          <Grid.Column width={10}>
            <Segment>
              <Header sub color="teal" content="Event Details"/>
              <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                <Field name="title" type="text" component={TextInput} placeholder="Give your event a name"/>

                <Field name="category" options={category} type="text" component={SelectInput}
                       placeholder="What is your about"/>

                <Field name="description" rows={3} type="text" component={TextArea}
                       placeholder="Tell us about your event"/>

                <Header sub color="teal" content="Event Location Details"/>

                <Field
                    name="city"
                    type="text"
                    component={PlaceInput}
                    placeholder="Event City"
                    options={{types: ['city']}}
                    callName="initOne"
                    onSelect={this.handleCitySelect}
                />
                {this.state.scriptLoaded &&
                <Field
                    name="venue"
                    type="text"
                    component={PlaceInput}
                    placeholder="Event Venue"
                    options={{
                      location: new google.maps.LatLng(this.state.cityLatLng),
                      radius: 2000,
                      types: ['establishment']
                    }}
                    callName="initTwo"
                />}


                <Field
                    name="date"
                    type="text"
                    component={DateInput}
                    dateFormat='YYYY-MM-DD HH:mm'
                    timeFormat='HH:mm'
                    showTimeSelect
                    placeholder="Date and time of event"
                />

                <Button positive disabled={invalid || submitting || pristine} type="submit">
                  Submit
                </Button>
                <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {

  };

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  }
};

const actions = {
  createEvent,
  updateEvent
};

export default connect(mapStateToProps,actions)(reduxForm(
    {form: 'eventForm', enableReinitialize: true, validate}
    )(EventForm));