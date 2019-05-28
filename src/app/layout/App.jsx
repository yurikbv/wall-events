import React from 'react';
import { Container } from "semantic-ui-react";

import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";

function App() {

  return (
      <React.Fragment>
        <NavBar/>
        <Container className="main">
          <EventDashboard/>
        </Container>
      </React.Fragment>
  );
}

export default App;
