import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Questionnaire.css';

function Questionnaire() {
  const [age, setAge] = useState('');
  const [skinType, setSkinType] = useState('');
  const [makeupStyle, setMakeupStyle] = useState('');
  const [focus, setFocus] = useState('');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    console.log('Age:', age, 'Skin Type:', skinType, 'Makeup Style:', makeupStyle, 'Focus:', focus, 'Gender:', gender, 'Name:', name);
    // Pass data through navigation state
    navigate('/upload', { state: { age, skinType, makeupStyle, focus, gender, name } });
  };

  return (
    <div className="Questionnaire">
      <h1 className="title">Questionnaire</h1>
      <p className="subtitle">Tell us more about your preferences</p>

      <div className="container">
        <div className="form-section">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="name-input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-section">
          <label className="form-label">Your Age</label>
          <input
            type="number"
            className="age-input"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="form-section">
          <label className="form-label">Your Skin Type</label>
          <div className="options">
            {['Dry', 'Normal', 'Oily', 'Combination'].map((type) => (
              <button
                key={type}
                className={`option-button ${skinType === type ? 'selected' : ''}`}
                onClick={() => setSkinType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">Your Makeup Preference</label>
          <div className="options">
            {['Natural', 'Bold'].map((style) => (
              <button
                key={style}
                className={`option-button ${makeupStyle === style ? 'selected' : ''}`}
                onClick={() => setMakeupStyle(style)}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">What do you want to focus on?</label>
          <input
            type="text"
            className="focus-input"
            placeholder="E.g., redness, wrinkle"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
          />
        </div>

        <div className="form-section">
          <label className="form-label">Your Gender</label>
          <div className="gender-slider">
            <button
              className={`gender-button ${gender === 'Male' ? 'selected' : ''}`}
              onClick={() => setGender('Male')}
            >
              Male
            </button>
            <button
              className={`gender-button ${gender === 'Female' ? 'selected' : ''}`}
              onClick={() => setGender('Female')}
            >
              Female
            </button>
          </div>
        </div>

        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Questionnaire;
