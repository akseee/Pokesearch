import { Component } from 'react';
import { SearchBar } from '../../../widgets/SearchBar';
import { ErrorButton } from '../../../features/ErrorButton';
import { ErrorContext } from '../../../app/ErrorBoundary/errorContext';
import { ErrorText } from '../../../features/ErrorText';

export class MainPage extends Component {
  static contextType = ErrorContext;
  declare context: React.ContextType<typeof ErrorContext>;

  renderError() {
    const { error, resetError } = this.context;
    if (!error) return null;

    return <ErrorText error={error} resetError={resetError} />;
  }

  render() {
    return (
      <div>
        <ErrorButton />
        <SearchBar />
        {this.renderError()}
      </div>
    );
  }
}
