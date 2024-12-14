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
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      console.log('File uploaded successfully:', file);
    }
  };

  // 激活摄像头
  const handleTakePhoto = async () => {
    try {
      console.log('Attempting to access camera...');
  
      if (streamRef.current) {
        console.log('Stopping existing stream...');
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
  
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('Camera access granted. Stream:', stream);
  
      streamRef.current = stream;
      console.log('Stream successfully stored.');
  
      setIsCameraActive(true); // 更新状态，触发渲染
  
      // 延迟绑定流到 video
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          console.log('Stream bound to video element.');
          videoRef.current.play().then(() => {
            console.log('Video playback started.');
            console.log(
              'Video Dimensions: ',
              videoRef.current.videoWidth,
              videoRef.current.videoHeight
            );
          }).catch((error) => {
            console.error('Failed to start video playback:', error);
          });
        } else {
          console.error('Video element not found.');
        }
      }, 100); // 等待 100ms
    } catch (err) {
      console.error('Failed to access the camera:', err);
      setError('Failed to access the camera. Please check permissions or device availability.');
    }
  };

  // 捕获照片
  const handleCapture = () => {
    try {
      console.log('Attempting to capture photo...');
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        console.log(
          'Capturing frame. Video Dimensions:',
          video.videoWidth,
          video.videoHeight
        );

        // 设置 Canvas 大小与视频一致
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // 绘制视频帧到 Canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // 保存图片数据
        const photoData = canvas.toDataURL('image/png');
        setImage(photoData); // 保存捕获的图片
        console.log('Photo captured successfully. Data URL:', photoData);

        // 停止摄像头
        if (streamRef.current) {
          console.log('Stopping camera stream...');
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }

        setIsCameraActive(false); // 更新摄像头状态
      } else {
        console.error('Video or canvas element not found.');
        setError('Video or canvas element not found.');
      }
    } catch (err) {
      console.error('Failed to capture image:', err);
      setError('Failed to capture image. Please try again.');
    }
  };

  // 提交处理
  const handleSubmit = async () => {
    console.log('Submitting data:', questionnaireData, image);
  
    const payload = {
      age: questionnaireData.age,
      skinType: questionnaireData.skinType,
      makeupStyle: questionnaireData.makeupStyle,
      focus: questionnaireData.focus,
      gender: questionnaireData.gender,
      name: questionnaireData.name,
      image: image,
    };
  
    navigate('/loading');
  
    try {
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
        }, 3000);
      });
  
      if (response.success) {
        console.log('API Response:', response.data);
        navigate('/result', { state: { analyses: response.data } });
      } else {
        console.error('API Error:', response.error || 'Unknown error');
        navigate('/error');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      navigate('/error');
    }
  };

  // 组件卸载时释放摄像头流
  useEffect(() => {
    return () => {
      console.log('Cleaning up camera resources...');
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
