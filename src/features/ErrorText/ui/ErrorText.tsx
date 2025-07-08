import { Component } from 'react';

interface ErrorTextProps {
  error: Error;
  resetError: () => void;
}

export class ErrorText extends Component<ErrorTextProps> {
  render() {
    const { error, resetError } = this.props;
    return (
      <div style={{ color: 'red' }}>
        <strong>Error:</strong> {error.toString()}
        <br />
        <button onClick={resetError}>Reset error</button>
      </div>
    );
  }
}
