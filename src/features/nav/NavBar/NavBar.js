import React, {Component} from 'react';
import { Menu, Container, Button} from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withFirebase } from 'react-redux-firebase';
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { openModal } from "../../modals/modalActions";

class NavBar extends Component {

  handleSignIn = () => {
    this.props.openModal('LoginModal');
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  };

  render() {

    const {auth, profile} = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
        <Menu inverted fixed="top" style={{zIndex:1000}}>
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
                ? <SignedInMenu profile={profile} signedOut={this.handleSignOut}/>
                : <SignedOutMenu signedIn={this.handleSignIn} register={this.handleRegister}/>}
          </Container>
        </Menu>
    );
  }
}

const mapDispatchToProps = {openModal};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
};

export default withRouter(withFirebase(connect(mapStateToProps, mapDispatchToProps)(NavBar)));