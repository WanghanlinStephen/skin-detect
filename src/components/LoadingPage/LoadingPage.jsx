import React, { useState, useEffect } from 'react';
import './LoadingPage.css';

const facts = [
  "Skin is the largest organ in the human body.",
  "Your skin renews itself every 28 days.",
  "Wrinkles are caused by sun exposure and loss of collagen.",
  "Staying hydrated helps keep your skin healthy."
];

function LoadingPage() {
  const [currentFact, setCurrentFact] = useState(0); // 当前显示的提示索引
  const [visibleText, setVisibleText] = useState(""); // 当前逐字显示的文字
  const [analyzingMessage, setAnalyzingMessage] = useState("Currently Analyzing...");
  const [charIndex, setCharIndex] = useState(0); // 当前逐字动画的索引

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length); // 每隔 5 秒切换提示
      setVisibleText("");
      setCharIndex(0);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (charIndex < facts[currentFact].length) {
        setVisibleText((prev) => prev + facts[currentFact][charIndex]);
        setCharIndex((prev) => prev + 1);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [charIndex, currentFact]);

  return (
    <div className="LoadingPage">
      <div className="loading-container">
        <h1 className="analyzing-message">{analyzingMessage}</h1>
        <p className="did-you-know">Did you know?</p>
        <p className="dynamic-text">{visibleText}</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
}

export default LoadingPage;
