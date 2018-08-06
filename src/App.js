import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import VirtualDom from "./VirtualDom";
import DragAndDrop from "./DragAndDrop";
import Home from "./Home";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Home} />
          <Route path="/virtualdom" component={VirtualDom} />
          <Route path="/draganddrop" component={DragAndDrop} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
