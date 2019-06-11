import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';

import {closeModal} from "./modalActions";
import RegisterForm from "../auth/Register/RegisterForm";

class RegisterModal extends Component {
  render() {
    return (
        <Modal
            size='mini'
            open={true}
            onClose={this.props.closeModal}
        >
          <Modal.Header>
            Sign Up to The Wall Events!
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <RegisterForm />
            </Modal.Description>
          </Modal.Content>
        </Modal>
    );
  }
}

const mapDispatchToProps = {closeModal};


export default connect(null, mapDispatchToProps)(RegisterModal);