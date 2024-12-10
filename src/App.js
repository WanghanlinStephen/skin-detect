import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage/Homepage.jsx';
import UploadImage from './components/UploadImage/UploadImage.jsx';
import ResultPage from './components/ResultPage/ResultPage.jsx';
import Questionnaire from './components/Questionnaire/Questionnaire.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingPage from './components/LoadingPage/LoadingPage.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/upload" element={<UploadImage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/loading" element={<LoadingPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
