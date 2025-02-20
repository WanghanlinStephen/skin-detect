import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultPage.css';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { analyses } = location.state || {};

  const skinScores = analyses.skin.Scores || {};
  const products = analyses.products || [];
  const coupon = analyses.promo_code || "XMASSALE2024";
  const [selectedAnalysis, setSelectedAnalysis] = useState(Object.keys(skinScores)[0] || '');
  const [scrollIndex, setScrollIndex] = useState(0);

  const selectedData = skinScores[selectedAnalysis] || {};

  const featuredProduct = products[0]; // 默认选择第一款作为主要推荐产品

  const handleScroll = (direction) => {
    const newIndex = scrollIndex + direction;
    if (newIndex >= 0 && newIndex <= products.length - 4) {
      setScrollIndex(newIndex);
    }
  };

  if (!Object.keys(skinScores).length) {
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
      {/* Skin Analysis Section */}
      <div className="analysis-section">
        <div className="image-container">
          <img
            src={`data:image/jpeg;base64,${selectedData.img || ''}`}
            alt={selectedAnalysis}
            className="result-image"
          />
        </div>
        <div className="button-group">
          {Object.keys(skinScores).map((key) => (
            <button
              key={key}
              className={`circle-button ${key === selectedAnalysis ? 'selected-button' : ''}`}
              onClick={() => setSelectedAnalysis(key)}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Advice Section */}
        <div className="advice-section">
          {/* <h2>Score:{selectedData.Score || 'No score available.'}</h2> */}
          <h2>Advice</h2>
          <p>{selectedData.Comment || 'No advice available.'}</p>
        </div>
      </div>

      {/* Featured Product Section */}
      <div className="featured-product">
        <h2>Featured Product</h2>
        {featuredProduct && (
          <div
            className="featured-box"
            onClick={() => window.open(featuredProduct.product_url, '_blank')}
          >
            <div className="featured-content">
              {/* 左侧图片 */}
              <img
                src={featuredProduct.image_src}
                alt={featuredProduct.title}
                className="featured-image"
              />
              {/* 右侧描述 */}
              <div className="featured-description">
                <p className="coupon">25% Off - Coupon: {coupon}</p>
                <p className="product-title">{featuredProduct.title}</p>
                <p className="product-price">${featuredProduct.var_price}</p>
                <p className="product-description">
                  Hydrating and anti-aging formula, perfect for reducing wrinkles and fine lines. 
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Section */}
      <div className="products-section">
        <h2>Products</h2>
        <div className="product-slider-container">
          <button
            className="slider-button left"
            onClick={() => handleScroll(-1)}
            disabled={scrollIndex === 0}
          >
            ‹
          </button>

          <div className="product-slider">
            {products.slice(1).slice(scrollIndex, scrollIndex + 2).map((product, index) => (
              <div
                key={index}
                className="product-box"
                onClick={() => window.open(product.product_url, '_blank')}
              >
                <img
                  src={product.image_src}
                  alt={product.title}
                  className="product-image"
                />
                <p className="product-title">{product.title}</p>
                <p className="product-price">${product.var_price}</p>
              </div>
            ))}
          </div>

          <button
            className="slider-button right"
            onClick={() => handleScroll(1)}
            disabled={scrollIndex >= products.length - 4}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
