import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultPage.css';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { analyses } = location.state || {};
  const [selectedAnalysis, setSelectedAnalysis] = useState(analyses?.[0]?.name || '');
  const [scrollIndex, setScrollIndex] = useState(0);

  // 爆款产品推荐
  const featuredProducts = [
    {
      image: 'https://8c3412d76225d04d7baa-be98b6ea17920953fb931282eff9a681.images.lovelyskin.com/450xafz3_202407031354377327.jpg', // 替换为实际图片链接
      coupon: 'TS20%OFF',
      description: 'Exclusive Discount on Best Seller!',
    }
  ];

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
              className={`circle-button ${analysis.name === selectedAnalysis ? 'selected-button' : ''
                }`}
              onClick={() => {
                setSelectedAnalysis(analysis.name);
                setScrollIndex(0);
              }}
            >
              {analysis.name}
            </button>
          ))}
        </div>
      </div>

      {/* 爆款产品推荐 */}


      {/* Advice 和 Product 模块 */}
      <div className="content-container">
        <div className="advice-section">
          <h2>Advice</h2>
          <p>{selectedData.advice}</p>
        </div>

        <div className="featured-products">
          <h2>Recommended Products</h2>
          <div className="featured-container">
            {featuredProducts.map((product, index) => (
              <div key={index} className="featured-box">
                <img src={product.image} alt="Featured Product" className="featured-image" />
                <div className="featured-info">
                  <p className="coupon">{product.coupon}</p>
                  <p className="description">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="product-section">
          <h2>Products</h2>
          {selectedData.product.length > 0 ? (
            <div className="product-slider-container">
              <button
                className="slider-button left"
                onClick={() => handleScroll(-1)}
                disabled={scrollIndex === 0}
              >
                ‹
              </button>

              <div className="product-slider">
                {selectedData.product.slice(scrollIndex, scrollIndex + 3).map((item, index) => (
                  <div key={index} className="product-box">
                    <img src={item.image} alt={item.description} className="product-image" />
                    <p className="product-description">{item.description}</p>
                  </div>
                ))}
              </div>

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
