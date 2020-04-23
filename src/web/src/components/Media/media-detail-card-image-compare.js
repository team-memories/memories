import React from 'react'
import ReactCompareImage from 'react-compare-image'
import '../../font.css'


// css
const beforeAfterSlider = { width: '75%', margin: 'auto', paddingTop: 50, paddingBottom: 80 }

function ImageCompare (props) {
  const before = props.originalUrl
  const after = props.url
  return (
    <div>
      {/* before after slide */}
      <div style={beforeAfterSlider}>
        <ReactCompareImage leftImage={before} rightImage={after}/>
      </div>
    </div>
  )
}

export default ImageCompare
