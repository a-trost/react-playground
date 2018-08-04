import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./App.css";

class VirtualDom extends Component {
  constructor(props) {
    super(props);
    this.changeCount = this.changeCount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.state = {
      count: 0,
      groceries: ["Milk", "Eggs", "Butter"],
      friends: ["Andy", "Janet", "Thomas"],
      groceryText: "",
      groceryPosition: 1,
      friendText: "",
      friendPosition: 1,
      timerSeconds: 0,
      timerRunning: false
    };
  }

  changeCount(delta) {
    let count = this.state.count + delta;
    this.setState({ count });
  }

  handleSubmit = name => event => {
    let list = this.state[name];
    if (name === "groceries") {
      list.splice(this.state.groceryPosition - 1, 0, this.state.groceryText);
      this.setState({
        groceries: list,
        groceryPosition: 1,
        groceryText: ""
      });
    } else if (name === "friends") {
      list.splice(this.state.friendPosition - 1, 0, this.state.friendText);
      this.setState({
        friends: list,
        friendPosition: 1,
        friendText: ""
      });
    }
  };

  handleChange = name => event => {
    if (name === "groceryPosition" || name === "friendPosition") {
      if (event.target.value >= 1) {
        this.setState({
          [name]: event.target.value
        });
      }
    } else {
      this.setState({
        [name]: event.target.value
      });
    }
  };

  handleToggle() {
    this.setState({ timerRunning: !this.state.timerRunning });
  }

  resetTimer() {
    this.setState({ timerRunning: false });
    this.setState({ timerSeconds: 0 });
  }

  render() {
    if (this.state.timerRunning) {
      setTimeout(() => {
        let timerSeconds = this.state.timerSeconds + 1;
        // Double "if" to prevent extra second on timer after "Reset" clicked.
        if (this.state.timerRunning) {
          this.setState({ timerSeconds });
        }
      }, 1000);
    }
    return (
      <div className="App">
        <section>
          <h1>Virtual DOM Playground</h1>
          <h3>Untouched Static Text</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a
            libero at ligula porta mollis. Mauris ac placerat quam, vel viverra
            quam. Maecenas rutrum, magna sit amet congue posuere, sapien lacus
            luctus mauris, et efficitur elit metus non felis.{" "}
          </p>
        </section>
        <section>
          <h3>Counter</h3>
          <p>Current count: {this.state.count}</p>
          <Button
            onClick={() => this.changeCount(1)}
            variant="contained"
            color="primary"
          >
            Add 1
          </Button>
          <Button
            onClick={() => this.changeCount(-1)}
            variant="contained"
            color="secondary"
          >
            Sub 1
          </Button>
        </section>

        {/* // List of removable/addable items */}
        <section>
          <h3>Grocery List (No Keys)</h3>
          <form onSubmit={this.handleSubmit("groceries")}>
            <TextField
              id="grocery"
              label="Add Item"
              value={this.state.groceryText}
              onChange={this.handleChange("groceryText")}
              margin="normal"
            />
            {"   "}
            <TextField
              id="groceryPosition"
              label="Item Position"
              value={this.state.groceryPosition}
              onChange={this.handleChange("groceryPosition")}
              type="number"
              margin="normal"
            />
            <br />
            <Button variant="outlined" onClick={this.handleSubmit("groceries")}>
              Add Item
            </Button>
          </form>
          <ol>
            {this.state.groceries &&
              this.state.groceries.map(item => <li>{item}</li>)}
          </ol>
        </section>
        <section>
          <h3>Friend List (With Keys)</h3>
          <form onSubmit={this.handleSubmit("friends")}>
            <TextField
              id="friend"
              label="Add Item"
              value={this.state.friendText}
              onChange={this.handleChange("friendText")}
              margin="normal"
            />
            {"   "}
            <TextField
              id="friendPosition"
              label="Item Position"
              value={this.state.friendPosition}
              onChange={this.handleChange("friendPosition")}
              type="number"
              margin="normal"
            />
            <br />
            <Button variant="outlined" onClick={this.handleSubmit("friends")}>
              Add Item
            </Button>
          </form>
          <ol>
            {this.state.friends &&
              this.state.friends.map(item => <li key={item}>{item}</li>)}
          </ol>
        </section>
        <section>
          <h3>Timer</h3>
          <p>{this.state.timerSeconds} seconds</p>
          <Button onClick={this.handleToggle}>Toggle Timer</Button>
          <Button onClick={this.resetTimer}>Reset Timer</Button>
        </section>
      </div>
    );
  }
}

export default VirtualDom;
