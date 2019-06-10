import React, {Component} from 'react';
import { Form, Label} from "semantic-ui-react";
import Script from "react-load-script";
import PlacesAutocomplete from 'react-places-autocomplete';

class PlaceInput extends Component {

  state = {
    scriptLoaded: false
  };

  handleScriptLoaded = () => this.setState({scriptLoaded: true});

  render() {
    const {input, width, onSelect, callName, placeholder, options, meta: {touched, error}} = this.props;

    return (
        <Form.Field error={touched && !!error} width={width}>
          <Script
              url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAD0v5BshSYbEcuO0sCf5BLfMqlvk_j9x0&libraries=places"
              onLoad={this.handleScriptLoaded}
          />
          {this.state.scriptLoaded &&
          <PlacesAutocomplete
              { ...input}
              googleCallbackName={callName}
              searchOptions={options}
              onSelect={onSelect}
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