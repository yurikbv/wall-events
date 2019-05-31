import React, {Component} from 'react';
import { Form, Label} from "semantic-ui-react";
import Script from "react-load-script";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

class PlaceInput extends Component {

  state = {
    address: '',
    scriptLoaded: false
  };

  handleChange = address => {
      this.setState({
        address
      });
  };

  handleScriptLoaded = () => this.setState({scriptLoaded: true});

  render() {

    const {input, width, onSelect, callName, placeholder, options, meta: {touched, error}} = this.props;
    return (
        <Form.Field error={touched && !!error} width={width}>
          <Script
              url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXfE3wOacfYwI5NrIg2K4LWqn6Fq_iaJg&libraries=places"
              onLoad={this.handleScriptLoaded}
          />
          {this.state.scriptLoaded &&
          <PlacesAutocomplete
              {...input}
              value={this.state.address}
              googleCallbackName={callName}
              searchOptions={options}
              onSelect={onSelect}
              onChange={this.handleChange}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                      {...getInputProps({
                        placeholder,
                        className: 'location-search-input',
                      })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                          <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                      );
                    })}
                  </div>
                </div>
            )}

          </PlacesAutocomplete>}
          {touched && error && <Label basic color="red">{error}</Label>}
        </Form.Field>
    );
  }
}

export default PlaceInput;