import { Component, type ReactNode } from 'react';
import { ErrorContext } from './errorContext';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null,
  };

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught an error:', error);
    this.setState({ error });
  }

  resetError = () => {
    this.setState({
      error: null,
    });
  };

  render() {
    return (
      <ErrorContext.Provider
        value={{
          error: this.state.error,
          resetError: this.resetError,
        }}
      >
        {this.props.children}
      </ErrorContext.Provider>
    );
  }
}
