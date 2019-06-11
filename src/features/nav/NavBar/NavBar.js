import React, {Component} from 'react';
import { Menu, Container, Button} from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { openModal } from "../../modals/modalActions";
import { logout } from "../../auth/authActions";

class NavBar extends Component {

  handleSignIn = () => {
    this.props.openModal('LoginModal');
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.logout();
    this.props.history.push('/');
  };

  render() {

    const {auth} = this.props.auth;
    const authenticated = auth.authenticated;

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
                ? <SignedInMenu currentUser={auth.currentUser} signedOut={this.handleSignOut}/>
                : <SignedOutMenu signedIn={this.handleSignIn} register={this.handleRegister}/>}
          </Container>
        </Menu>
    );
  }
}

const mapDispatchToProps = {openModal, logout};

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));