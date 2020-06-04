import React from 'react';
import ReactCompareImage from '../ReactCompareImage/ReactCompareImage';
import '../../font.css';

// css
const beforeAfterSlider = { width: '100%', margin: 'auto', paddingBottom: 30 };

function ImageCompare (props) {
  const before = props.originalUrl;
  const after = props.url;
  return (
    <div>
      {/* before after slide */}
      <div style={beforeAfterSlider}>
        <ReactCompareImage
          leftImage={before}
          rightImage={after}
          sliderPositionPercentage={0.07}
        />
      </div>
    </div>
  );
}

export default ImageCompare;
