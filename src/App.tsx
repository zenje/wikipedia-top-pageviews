import TopPages from './components/containers/TopPages';
import { TITLE } from './utils/strings';

function App() {
  return (
    <>
      <header>
        <h2>{TITLE}</h2>
      </header>
      <TopPages />
    </>
  );
}

export default App;
