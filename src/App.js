import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Router from './routing';
import Loading from './components/loading';
import ErrorMessage from './components/error-message';
import CreateDealModal from './components/create-deal-modal';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="App-main">
          <Sidebar />
          <div style={{ flexGrow: 1, display: 'flex', marginTop: 64 }}>
            <Router />
          </div>
          <ErrorMessage />
          <CreateDealModal />
        </div>
        <Loading />
      </div>
    </BrowserRouter>
  );
}

export default App;
