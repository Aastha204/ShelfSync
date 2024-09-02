import React, { useEffect, useState } from 'react';
import '../styles/Preloader.css'; // Ensure you create this CSS file

const Preloader = ({ onTransitionEnd }) => {
  const [zoomOut, setZoomOut] = useState(false);
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    // Trigger the zoom-out after 1 second
    const zoomOutTimer = setTimeout(() => {
      setZoomOut(true);
    }, 1000);

    // Trigger the slide-up after the zoom-out animation ends
    const slideUpTimer = setTimeout(() => {
      setSlideUp(true);
    }, 3000); // Delay to match the duration of the zoom-out effect

    // Notify parent when slide-up ends
    const transitionEndTimer = setTimeout(() => {
      if (onTransitionEnd) onTransitionEnd();
    }, 4000); // Delay should be slightly longer to ensure transition finishes

    return () => {
      clearTimeout(zoomOutTimer);
      clearTimeout(slideUpTimer);
      clearTimeout(transitionEndTimer);
    };
  }, [onTransitionEnd]);

  return (
    <div className={`preloader ${slideUp ? 'slide-up' : ''}`}>
      <div className={`preloader-text ${zoomOut ? 'zoom-out' : ''}`}>
      <img
              src="./images/logo1shelf.png" // Path to your logo image
              alt="Library Logo"
              className="preloader-logo" // Adjust the logo height here
            />
        <b>ShelfSync: Effortlessly Managed.</b>
      </div>
    </div>
  );
};

export default Preloader;
