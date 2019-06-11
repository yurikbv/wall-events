import React from 'react';
import {Button, Menu} from "semantic-ui-react";

const SignedOutMenu = ({signedIn, register}) => {
  return (
      <Menu.Item position="right">
        <Button basic inverted content="Login" onClick={signedIn}/>
        <Button
            basic
            inverted
            content="Register"
            style={{ marginLeft: '0.5em' }}
            onClick={register}
        />
      </Menu.Item>
  );
};

export default SignedOutMenu;