import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UploadImage.css';

function UploadImage() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const questionnaireData = location.state;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.play();

      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const context = canvas.getContext('2d');

      setTimeout(() => {
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const photo = canvas.toDataURL('image/png');
        setImage(photo);
        stream.getTracks().forEach((track) => track.stop());
      }, 1000);
    } catch (error) {
      console.error('Failed to access the camera:', error);
    }
  };

  const handleSubmit = async () => {
    console.log('Submitting data:', questionnaireData, image);
  
    // Simulated API request payload
    const payload = {
      age: questionnaireData.age,
      skinType: questionnaireData.skinType,
      makeupStyle: questionnaireData.makeupStyle,
      focus: questionnaireData.focus,
      gender: questionnaireData.gender,
      name: questionnaireData.name,
      image: image,
    };
  
    // Navigate to Loading page
    navigate('/loading');
  
    try {
      // Simulating API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: [
              {
                name: 'Wrinkles',
                image: 'https://www.canfieldsci.com/common/images/imaging-systems/visia-complexion-analysis/card-uv-spots.jpg',
                advice: 'Use anti-aging cream to reduce wrinkles.',
                product: [
                  {
                    image: 'https://www.skinceuticals.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-skinceuticals-master-catalog/default/dwa974d950/Products/S17/C-E-Ferulic-SkinCeuticals_Award_Seals.jpg?sw=930&sfrm=jpg&q=70',
                    description: 'C E Ferulic® with 15% L-Ascorbic Acid',
                  },
                  {
                    image: 'https://www.skinceuticals.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-skinceuticals-master-catalog/default/dwa974d950/Products/S17/C-E-Ferulic-SkinCeuticals_Award_Seals.jpg?sw=930&sfrm=jpg&q=70',
                    description: 'Triple Lipid Restore 2:4:2',
                  },
                ],
              },
              {
                name: 'Fine Lines',
                image: 'https://www.canfieldsci.com/common/images/imaging-systems/visia-complexion-analysis/card-brown-spots.jpg',
                advice: 'Moisturize daily to smooth fine lines.',
                product: [
                  {
                    image: 'https://www.skinceuticals.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-skinceuticals-master-catalog/default/dwa974d950/Products/S17/C-E-Ferulic-SkinCeuticals_Award_Seals.jpg?sw=930&sfrm=jpg&q=70',
                    description: 'Retinol 0.3',
                  },
                ],
              },
              {
                name: 'Deep Wrinkles',
                image: 'https://www.canfieldsci.com/common/images/imaging-systems/visia-complexion-analysis/card-red-areas.jpg',
                advice: 'Consider professional treatments for deep wrinkles.',
                product: [
                  {
                    image: 'https://www.skinceuticals.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-skinceuticals-master-catalog/default/dwa974d950/Products/S17/C-E-Ferulic-SkinCeuticals_Award_Seals.jpg?sw=930&sfrm=jpg&q=70',
                    description: 'Retinol 0.3',
                  },
                ],
              },
            ],
          });
        }, 3000); // Simulate API delay
      });
  
      if (response.success) {
        console.log('API Response:', response.data);
        // Navigate to result page after API call
        navigate('/result', { state: { analyses: response.data } });
      } else {
        console.error('API Error:', response.error || 'Unknown error');
        navigate('/error'); // Redirect to an error page if necessary
      }
    } catch (error) {
      console.error('Submission failed:', error);
      navigate('/error'); // Redirect to an error page
    }
  };
  

  return (
    <div className="UploadImage">
      <h1 className="title">Upload Photo</h1>
      <div className="container">
        <label className="file-label">
          <input
            type="file"
            accept="image/*"
            className="file-input"
            onChange={handleFileChange}
          />
          <span className="file-button">Choose File</span>
        </label>

        <button onClick={handleTakePhoto} className="camera-button">
          Take Photo
        </button>

        {image && <img src={image} alt="Preview" className="preview" />}

        <button onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
}

export default UploadImage;
