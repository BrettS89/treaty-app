import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Router from './routing';
import Loading from './components/loading';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="App-main">
          <Sidebar />
          <Router />
        </div>
        <Loading />
      </div>
    </BrowserRouter>
  );
}

export default App;
