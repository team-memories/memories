import React from 'react'
import ReactCompareImage from 'react-compare-image'
import '../../font.css'


// css
const topDiv = { background: 'linear-gradient(#16355F 65%, white 35%)', paddingTop: 90 }
const beforeAfterSlider = { width: '55%', margin: 'auto', paddingTop: 50, paddingBottom: 150 }

function ImageCompare (props) {
  const before = props.originalUrl
  const after = props.url
  return (
    <div style={topDiv}>
      {/* before after slide */}
      <div style={beforeAfterSlider}>
        <ReactCompareImage leftImage={before} rightImage={after}/>
      </div>
    </div>
  )
}

export default ImageCompare
