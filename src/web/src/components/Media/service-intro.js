import React from 'react'
import ReactCompareImage from 'react-compare-image'
import { Typography } from 'antd'
import '../../font.css'

const { Title } = Typography

// images
const before = 'https://github.com/kookmin-sw/capstone-2020-12/blob/serviceIntro/src/web/src/Image/church-4911852_640.jpg?raw=true'
const after = 'https://github.com/kookmin-sw/capstone-2020-12/blob/serviceIntro/src/web/src/Image/church-4911852_1920.jpg?raw=true'
const logo = 'https://github.com/kookmin-sw/capstone-2020-12/blob/master/doc/image/logo_white.png?raw=true'

// css
const topDiv = { background: 'linear-gradient(#16355F 65%, white 35%)', paddingTop: 90 }
const image = { display: 'block', maxWidth: '40%', maxHeight: 40, width: 'auto', height: 'auto', margin: 'auto' }
const slogan = {
  color: 'lightGray',
  paddingTop: 15,
  textAlign: 'center',
  fontSize: 24,
  letterSpacing: '0.01em',
  fontWeight: 200
}
const beforeAfterSlider = { width: '55%', margin: 'auto', paddingTop: 50, paddingBottom: 150 }
const bottomTitle = { textAlign: 'center', color: 'gray', fontFamily: 'Nanum Pen Script', fontSize: 70 }

function ServiceIntro (props) {
  return (
    <div style={topDiv}>
      {/* logo Image */}
      <img src={logo} style={image} alt='Memories'/>

      {/* slogan */}
      <Title level={3} style={slogan}>그 때 그 시간을 다시 생생하게</Title>

      {/* before after slide */}
      <div style={beforeAfterSlider}>
        <ReactCompareImage leftImage={before} rightImage={after}/>
      </div>

      {/* Typography  */}
      <Title level={1} style={bottomTitle}>{props.yearFrom}년 ~ {props.yearTo}년 {props.location} 청계천</Title>
    </div>
  )
}

export default ServiceIntro

