import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultPage.css';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // 从 location.state 获取分析数据
  const { analyses } = location.state || {};
  const [selectedAnalysis, setSelectedAnalysis] = useState(analyses?.[0]?.name || ''); // 默认选中第一个分析项
  const [scrollIndex, setScrollIndex] = useState(0); // 产品滑动起始索引

  // 根据选中项获取数据
  const selectedData = analyses?.find((analysis) => analysis.name === selectedAnalysis);

  const handleScroll = (direction) => {
    const newIndex = scrollIndex + direction;
    if (selectedData && newIndex >= 0 && newIndex <= selectedData.product.length - 3) {
      setScrollIndex(newIndex);
    }
  };

  if (!analyses || analyses.length === 0) {
    return (
      <div className="ResultPage">
        <h1>No Analysis Data</h1>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="ResultPage">
      {/* 图片和分析按钮 */}
      <div className="main-content">
        <div
          className="image-container"
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        >
          <img src={selectedData.image} alt={selectedAnalysis} className="result-image" />
        </div>

        <div className="button-group">
          {analyses.map((analysis) => (
            <button
              key={analysis.name}
              className={`circle-button ${
                analysis.name === selectedAnalysis ? 'selected-button' : ''
              }`}
              onClick={() => {
                setSelectedAnalysis(analysis.name);
                setScrollIndex(0); // 切换分析项时重置滚动索引
              }}
            >
              {analysis.name}
            </button>
          ))}
        </div>
      </div>

      {/* 上下排列的 Advice 和 Product */}
      <div className="content-container">
        {/* Advice Section */}
        <div className="advice-section">
          <h2>Advice</h2>
          <p>{selectedData.advice}</p>
        </div>

        {/* Product Section */}
        <div className="product-section">
          <h2>Products</h2>
          {selectedData.product.length > 0 ? (
            <div className="product-slider-container">
              {/* Left Arrow */}
              <button
                className="slider-button left"
                onClick={() => handleScroll(-1)}
                disabled={scrollIndex === 0}
              >
                ‹
              </button>

              {/* Product Slider */}
              <div className="product-slider">
                {selectedData.product.slice(scrollIndex, scrollIndex + 3).map((item, index) => (
                  <div
                    key={index}
                    className="product-box"
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  >
                    <img src={item.image} alt={item.description} className="product-image" />
                    <p className="product-description">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                className="slider-button right"
                onClick={() => handleScroll(1)}
                disabled={scrollIndex === selectedData.product.length - 3}
              >
                ›
              </button>
            </div>
          ) : (
            <p>No products available for this analysis.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
