import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 引入useNavigate和useLocation
import './ErrorPage.css'; // 引入CSS样式

function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 获取错误信息
  const errorInfo = location.state?.errorInfo || "Something went wrong. Please try again later."; // 如果没有传入errorInfo，显示默认信息

  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-title">Oops! Something went wrong...</h1>
        <p className="error-message">{errorInfo}</p>
        <button className="error-btn" onClick={() => navigate('/')}>Go Back to Homepage</button>
      </div>
    </div>
  );
}

export default ErrorPage;
