
import './App.css';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CardDetails from './components/CardDetails';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/card/:id" element={<CardDetails />} />
          </Routes>
        <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;
