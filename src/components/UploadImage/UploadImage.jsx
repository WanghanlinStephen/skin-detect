import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UploadImage.css';

function UploadImage() {
  const [image, setImage] = useState(null); // 捕获的图片
  const [isCameraActive, setIsCameraActive] = useState(false); // 摄像头状态
  const [error, setError] = useState(null); // 错误信息
  const videoRef = useRef(null); // 视频元素引用
  const canvasRef = useRef(null); // Canvas 元素引用
  const streamRef = useRef(null); // 摄像头流引用
  const navigate = useNavigate();
  const location = useLocation();
  const questionnaireData = location.state;

  // 文件上传处理
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64Image = await convertImageToBase64(file);
        // console.log('Base64 Encoded Image:', base64Image);
        setImage(base64Image); // 将 Base64 图像设置到状态中
      } catch (error) {
        console.error('Error converting image:', error);
        alert('Failed to process the image. Please try again.');
      }
    }
  };

  // 激活摄像头
  const handleTakePhoto = async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setIsCameraActive(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 100);
    } catch (err) {
      console.error('Failed to access the camera:', err);
      setError('Failed to access the camera. Please check permissions or device availability.');
    }
  };

  // 捕获照片
  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const photoData = canvas.toDataURL('image/png');
      setImage(photoData);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setIsCameraActive(false);
    }
  };

  // 提交处理
  // const handleSubmit = async () => {
  //   console.log('Submitting data:', questionnaireData, image);
  
  //   const payload = {
  //     age: questionnaireData.age,
  //     skinType: questionnaireData.skinType,
  //     makeupStyle: questionnaireData.makeupStyle,
  //     focus: questionnaireData.focus,
  //     gender: questionnaireData.gender,
  //     name: questionnaireData.name,
  //     image: image,
  //   };
  
  //   navigate('/loading');
  
  //   try {
  //     const response = await new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve({
  //           success: true,
  //           data: [
  //             {
  //               name: 'Wrinkles',
  //               image: 'https://www.canfieldsci.com/common/images/imaging-systems/visia-complexion-analysis/card-uv-spots.jpg',
  //               advice: 'Use anti-aging cream to reduce wrinkles.',
  //               product: [
  //                 {
  //                   image: 'https://www.skinceuticals.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-skinceuticals-master-catalog/default/dwa974d950/Products/S17/C-E-Ferulic-SkinCeuticals_Award_Seals.jpg?sw=930&sfrm=jpg&q=70',
  //                   description: 'C E Ferulic® with 15% L-Ascorbic Acid',
  //                 },
  //                 {
  //                   image: 'https://www.skinceuticals.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-skinceuticals-master-catalog/default/dwa974d950/Products/S17/C-E-Ferulic-SkinCeuticals_Award_Seals.jpg?sw=930&sfrm=jpg&q=70',
  //                   description: 'Triple Lipid Restore 2:4:2',
  //                 },
  //               ],
  //             },
  //             {
  //               name: 'Fine Lines',
  //               image: 'https://www.canfieldsci.com/common/images/imaging-systems/visia-complexion-analysis/card-brown-spots.jpg',
  //               advice: 'Moisturize daily to smooth fine lines.',
  //               product: [
  //                 {
  //                   image: 'https://www.skinceuticals.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-skinceuticals-master-catalog/default/dwa974d950/Products/S17/C-E-Ferulic-SkinCeuticals_Award_Seals.jpg?sw=930&sfrm=jpg&q=70',
  //                   description: 'Retinol 0.3',
  //                 },
  //               ],
  //             },
  //             {
  //               name: 'Deep Wrinkles',
  //               image: 'https://www.canfieldsci.com/common/images/imaging-systems/visia-complexion-analysis/card-red-areas.jpg',
  //               advice: 'Consider professional treatments for deep wrinkles.',
  //               product: [
  //                 {
  //                   image: 'https://www.skinceuticals.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-skinceuticals-master-catalog/default/dwa974d950/Products/S17/C-E-Ferulic-SkinCeuticals_Award_Seals.jpg?sw=930&sfrm=jpg&q=70',
  //                   description: 'Retinol 0.3',
  //                 },
  //               ],
  //             },
  //           ],
  //         });
  //       }, 3000);
  //     });
  
  //     if (response.success) {
  //       console.log('API Response:', response.data);
  //       navigate('/result', { state: { analyses: response.data } });
  //     } else {
  //       console.error('API Error:', response.error || 'Unknown error');
  //       navigate('/error');
  //     }
  //   } catch (error) {
  //     console.error('Submission failed:', error);
  //     navigate('/error');
  //   }
  // };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
  
      reader.readAsDataURL(file);
    });
  };

  const stripAlphaChannel = (base64Image) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
  
      // 确保 Base64 数据格式正确
      console.log('Input Base64 Image:', base64Image);
      if (!base64Image.startsWith('data:image/')) {
        base64Image = `data:image/jpeg;base64,${base64Image}`;
        console.log('Modified Base64 Image:', base64Image);
      }
  
      img.src = base64Image;
  
      img.onload = () => {
        try {
          console.log('Image loaded successfully:', img.width, img.height);
  
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
  
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
          const newBase64 = canvas.toDataURL('image/jpeg');
          console.log('Processed Base64 Image:', newBase64);
          resolve(newBase64);
        } catch (error) {
          console.error('Error processing canvas:', error);
          reject(error);
        }
      };
  
      img.onerror = (error) => {
        console.error('Image failed to load:', error);
        reject(new Error('Image failed to load'));
      };
    });
  };

  const handleSubmit = async () => {
    // console.log('Submitting data:', questionnaireData, image);
  
    if (!image) {
      console.error('No image provided!');
      alert('Please upload or capture an image.');
      return;
    }
  
    // 去掉 Alpha 通道并确保 Base64 格式正确
    let processedImage = image; // 新变量用于保存处理后的数据

    try {
      if (processedImage.startsWith('data:image/')) {
        processedImage = processedImage.split(',')[1]; // 去掉前缀
      }
      processedImage = await stripAlphaChannel(processedImage); // 去掉透明度，转换为 RGB
      console.log('Processed image:', processedImage);
    } catch (error) {
      console.error('Image processing error:', error);
      alert('Failed to process image. Please try again.');
      return;
    }
  
    const payload = {
      user_id: 1, // Optional
      name: questionnaireData.name,
      source: 'treasurescape',
      image: processedImage, // 确保为 Base64 格式
      age: questionnaireData.age,
      focus: questionnaireData.focus,
      gender: questionnaireData.gender,
      skin_type: questionnaireData.skinType,
      makeup_style: questionnaireData.makeupStyle,
    };

    console.log(JSON.stringify(payload))
  
    navigate('/loading');
  
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 100000);
  
    try {
      const response = await fetch('http://35.94.48.207:8000/api/faceai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
  
      clearTimeout(timeoutId);
      console.log(response)
  
      if (!response.ok) {
        console.error('API Error: Non-200 response status', response.status);
        console.error('error details:', response.data)
        navigate('/error')
        return;
      }
  
      const responseData = await response.json();
      console.log('API Response:', responseData);
      navigate('/result', { state: { analyses: responseData } });
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Request Timeout: The request took too long to complete.');
        alert('Request timeout. Please try again.');
      } else {
        console.error('Submission failed:', error.message || 'Unknown error');
      }
      navigate('/error');
    }
  };
  
  

  // 组件卸载时释放摄像头流
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="UploadImage">
      <h1 className="title">Upload Photo</h1>
      <div className="container">
        {error && <p className="error">{error}</p>}

        <label className="file-label">
          <input
            type="file"
            accept="image/*"
            className="file-input"
            onChange={handleFileChange}
          />
          <span className="file-button">Choose File</span>
        </label>

        {!isCameraActive && (
          <button onClick={handleTakePhoto} className="camera-button">
            Take Photo
          </button>
        )}

        {isCameraActive && (
          <div className="camera-preview">
            <video ref={videoRef} className="video" autoPlay playsInline />
            
            {/* 矢量图覆盖 */}
            <img
              src="https://skin-doctor-frontend.s3.us-east-2.amazonaws.com/images/head.svg"
              alt="Head Overlay"
              className="head-overlay"
            />

            <button onClick={handleCapture} className="capture-btn">
              Capture Photo
            </button>
          </div>
        )}

        {image && <img src={image} alt="Captured Preview" className="preview" />}
        <button onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
}

export default UploadImage;
