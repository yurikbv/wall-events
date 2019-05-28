import React, {Component} from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

class EventForm extends Component {

  state = {
    event: {
      title: '',
      date: '',
      city: '',
      venue: '',
      hostedBy: ''
    }
  };

  onFormSubmit = event => {
    event.preventDefault();
    console.table(this.state.event)
  };

  handleInputChange = event => {
    const newEvent = this.state.event;
    newEvent[event.target.name] = event.target.value;
    this.setState({
      event: newEvent
    })
  };

  render() {
    const {handleCancel} = this.props;
    const {event} = this.state;
    return (
        <Segment>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Field>
              <label>Event Title</label>
              <input
                  placeholder="Event Title"
                  value={event.title}
                  name="title"
                  onChange={this.handleInputChange}/>
            </Form.Field>
            <Form.Field>
              <label>Event Date</label>
              <input type="date"
                     placeholder="Event Date"
                     value={event.date}
                     name="date"
                     onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <input
                  placeholder="City event is taking place"
                  value={event.city}
                  name="city"
                  onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Venue</label>
              <input placeholder="Enter the Venue of the event"
                     value={event.venue}
                     name="venue"
                     onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Hosted By</label>
              <input
                  placeholder="Enter the name of person hosting"
                  value={event.hostedBy}
                  name="hostedBy"
                  onChange={this.handleInputChange}
              />
            </Form.Field>
            <Button positive type="submit">
              Submit
            </Button>
            <Button type="button" onClick={handleCancel}>Cancel</Button>
          </Form>
        </Segment>
    );
  }
}

export default EventForm;