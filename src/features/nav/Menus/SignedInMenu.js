import React from 'react';
import { Link } from "react-router-dom";
import {Menu, Image, Dropdown} from "semantic-ui-react";

const SignedInMenu = ({signedOut,auth}) => {
  return (
      <Menu.Item position="right" >
        <Image avatar spaced="right" src="/assets/user.png" />
        <Dropdown pointing="top left" text={auth.email} >
          <Dropdown.Menu style={{zIndex:801}}>
            <Dropdown.Item text="Create Event" icon="plus" />
            <Dropdown.Item text="My Events" icon="calendar" />
            <Dropdown.Item text="My Network" icon="users" />
            <Dropdown.Item text="My Profile" icon="user" />
            <Dropdown.Item as={Link} to='/settings' text="Settings" icon="settings" />
            <Dropdown.Item text="Sign Out" icon="power" onClick={signedOut}/>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
  );
};

export default SignedInMenu;