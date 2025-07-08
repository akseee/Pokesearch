import { MainPage } from '../pages/MainPage/ui/MainPage';
import { ErrorBoundary } from './ErrorBoundary/ErrorBoundary';

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
