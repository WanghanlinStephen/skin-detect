import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Homepage.css';
import backgroundImage from '../../assets/background.jpg'; // Import the image

function Homepage() {
  const navigate = useNavigate(); // Create navigate function

  return (
    <div className="Homepage">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${backgroundImage})`, // Dynamically set background image
        }}
      ></div>

      <div className="header">
        <h1 className="brand-title">SKIN GENIUS</h1>
        <h2 className="sub-title">Discover Your Skin</h2>
      </div>

      <div className="content">
        <p className="description">
          Understand your skin like never before.<br />
          Powered by AI. Trusted by dermatologists.
        </p>
        <div className="features">
          <div className="feature">
            <p className="feature-value">8</p>
            <p className="feature-label">Health Score</p>
          </div>
          <div className="feature">
            <p className="feature-value">AI</p>
            <p className="feature-label">High Accuracy</p>
          </div>
          <div className="feature">
            <p className="feature-value">95%</p>
            <p className="feature-label">Expert Approval</p>
          </div>
        </div>
        <button className="start-btn" onClick={() => navigate('/questionnaire')}>
          Start Your Assessment
        </button>
      </div>

      <footer className="footer">Homepage</footer>
    </div>
  );
}

export default Homepage;
