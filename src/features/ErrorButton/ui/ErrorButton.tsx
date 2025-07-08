import { Component } from 'react';

type brokenState = {
  counter: number;
};

export class ErrorButton extends Component<Record<string, never>, brokenState> {
  state: brokenState = { counter: 0 };

  handleClick = () => {
    this.setState((prevState: brokenState) => ({
      counter: prevState.counter + 1,
    }));
  };

  render() {
    if (this.state.counter === 1) {
      throw new Error('Congrats, you crashed the app.');
    }
    return (
      <button type="button" onClick={this.handleClick}>
        Click to destroy!
      </button>
    );
  }
}
