import React, {Component} from 'react';
import { Menu, Container, Button} from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";

class NavBar extends Component {

  state = {
    authenticated:false
  };

  handleSignIn = () => {
    this.setState({authenticated: true})
  };

  handleSignOut = () => {
    this.setState({authenticated: false});
    this.props.history.push('/');
  };

  render() {

    const {authenticated} = this.state;

    return (
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item header as={Link} to="/">
              <img src="/assets/logo.png" alt="logo" />
              The Wall Events
            </Menu.Item>
            <Menu.Item as={NavLink} to="/events" name="Events" />
            
            {authenticated &&
            <React.Fragment>
              <Menu.Item as={NavLink} to="/people" name="People"/>
              <Menu.Item>
                <Button as={Link} to="/createEvent" floated="right" positive inverted content="Create Event"/>
              </Menu.Item>
            </React.Fragment>
            }
            
            
            {authenticated
                ? <SignedInMenu signedOut={this.handleSignOut}/>
                : <SignedOutMenu signedIn={this.handleSignIn}/>}
          </Container>
        </Menu>
    );
  }
}

export default withRouter(NavBar);