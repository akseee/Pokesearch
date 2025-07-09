import { MainPage } from '../pages/MainPage/ui/MainPage';
import { ErrorBoundary } from './errorBoundary/ErrorBoundary';
import '../shared/styles';

function App() {
  return (
    <>
      <ErrorBoundary>
        <MainPage></MainPage>
      </ErrorBoundary>
    </>
  );
}

export default App;
