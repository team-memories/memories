// upload-place-select.js
// search-bar-place-select.js
export const LocationOptions = [
  {
    value: '대한민국',
    label: '대한민국',
    children: [
      {
        value: '서울특별시',
        label: '서울특별시',
        children: [
          { value: '강남구', label: '강남구' },
          { value: '강동구', label: '강동구' },
          { value: '강북구', label: '강북구' },
          { value: '강서구', label: '강서구' },
          { value: '관악구', label: '관악구' },
          { value: '광진구', label: '광진구' },
          { value: '구로구', label: '구로구' },
          { value: '금천구', label: '금천구' },
          { value: '노원구', label: '노원' },
          { value: '도봉구', label: '도봉구' },
          { value: '동대문구', label: '동대문구' },
          { value: '동작구', label: '동작구' },
          { value: '마포구', label: '마포구' },
          { value: '서대문구', label: '서대문구' },
          { value: '서초구', label: '서초구' },
          { value: '성동구', label: '성동구' },
          { value: '성북구', label: '성북구' },
          { value: '송파구', label: '송파구' },
          { value: '양천구', label: '양천구' },
          { value: '영등포구', label: '영등포구' },
          { value: '용산구', label: '용산구' },
          { value: '은평구', label: '은평구' },
          { value: '종로구', label: '종로구' },
          { value: '중구', label: '중구' },
          { value: '중랑구', label: '중랑구' },
        ],
      },
      {
        value: '부산광역시',
        label: '부산광역시',
        children: [
          { value: '강서구', label: '강서구' },
          { value: '금정구', label: '금정구' },
          { value: '기장군', label: '기장군' },
          { value: '남구', label: '남구' },
          { value: '동구', label: '동구' },
          { value: '동래구', label: '동래구' },
          { value: '부산진구', label: '부산진구' },
          { value: '북구', label: '북구' },
          { value: '사상구', label: '사상구' },
          { value: '사하구', label: '사하구' },
          { value: '서구', label: '서구' },
          { value: '수영구', label: '수영구' },
          { value: '연제구', label: '연제구' },
          { value: '영동구', label: '영동구' },
          { value: '중구', label: '중구' },
          { value: '해운대구', label: '해운대구' },
        ]
      },
      {
        value: '대구광역시',
        label: '대구광역시',
        children: [
          { value: '남구', label: '남구' },
          { value: '달서구', label: '달서구' },
          { value: '달성군', label: '달성군' },
          { value: '동구', label: '동구' },
          { value: '북구', label: '북구' },
          { value: '서구', label: '서구' },
          { value: '수성구', label: '수성구' },
          { value: '중구', label: '중구' },
        ]
      },
      {
        value: '인천광역시',
        label: '인천광역시',
        children: [
          { value: '강화군', label: '강화군' },
          { value: '계양구', label: '계양구' },
          { value: '남동구', label: '남동구' },
          { value: '동구', label: '동구' },
          { value: '미추홀구', label: '미추홀구' },
          { value: '부평구', label: '부평구' },
          { value: '서구', label: '서구' },
          { value: '연수구', label: '연수구' },
          { value: '웅진군', label: '웅진군' },
          { value: '중구', label: '중구' },
        ]
      },
      {
        value: '광주광역시',
        label: '광주광역시',
        children: [
          { value: '광산구', label: '광산구' },
          { value: '남구', label: '남구' },
          { value: '동구', label: '동구' },
          { value: '북구', label: '북구' },
          { value: '서구', label: '서구' },
        ]
      },
      {
        value: '대전광역시',
        label: '대전광역시',
        children: [
          { value: '대덕구', label: '대덕구' },
          { value: '동구', label: '동구' },
          { value: '서구', label: '서구' },
          { value: '유성구', label: '유성구' },
          { value: '중구', label: '중구' },
        ]
      },
      {
        value: '울산광역시',
        label: '울산광역시',
        children: [
          { value: '남구', label: '남구' },
          { value: '동구', label: '동구' },
          { value: '북구', label: '북구' },
          { value: '울주군', label: '울주군' },
          { value: '중구', label: '중구' },
        ]
      },
      {
        value: '세종특별자치시',
        label: '세종특별자치시',
      },
      {
        value: '경기도',
        label: '경기도',
        children: [
          { value: '가평군', label: '가평군' },
          {
            value: '고양시',
            label: '고양시',
            children: [
              { value: '덕양구', label: '덕양구' },
              { value: '일산동구', label: '일산동구' },
              { value: '일산서구', label: '일산서구' },
            ]
          },
          { value: '과천시', label: '과천시' },
          { value: '광명시', label: '광명시' },
          { value: '광주시', label: '광주시' },
          { value: '구리시', label: '구리시' },
          { value: '군포시', label: '군포시' },
          { value: '김포시', label: '김포시' },
          { value: '남양주시', label: '남양주시' },
          { value: '동두천시', label: '동두천시' },
          { value: '부천시', label: '부천시' },
          {
            value: '성남시',
            label: '성남시',
            children: [
              { value: '분당구', label: '분당구' },
              { value: '수정구', label: '수정구' },
              { value: '중원구', label: '중원구' },
            ]
          },
          {
            value: '수원시',
            label: '수원시',
            children: [
              { value: '권선구', label: '권선구' },
              { value: '영통구', label: '영통구' },
              { value: '장안구', label: '장안구' },
              { value: '팔달구', label: '팔달구' },
            ]
          },
          { value: '시흥시', label: '시흥시' },
          {
            value: '안산시',
            label: '안산시',
            children: [
              { value: '단원구', label: '단원구' },
              { value: '상록구', label: '상록구' },
            ]
          },
          { value: '안성시', label: '안성시' },
          {
            value: '안양시',
            label: '안양시',
            children: [
              { value: '단원구', label: '단원구' },
              { value: '만안구', label: '만안구' },
            ]
          },
          { value: '양주시', label: '양주시' },
          { value: '양평군', label: '양평군' },
          { value: '여주시', label: '여주시' },
          { value: '연천군', label: '연천군' },
          { value: '오산시', label: '오산시' },
          {
            value: '용인시',
            label: '용인시',
            children: [
              { value: '기흥구', label: '기흥구' },
              { value: '수지구', label: '수지구' },
              { value: '처인구', label: '처인구' },
            ]
          },
          { value: '의왕시', label: '의왕시' },
          { value: '의정부시', label: '의정부시' },
          { value: '이천시', label: '이천시' },
          { value: '파주시', label: '파주시' },
          { value: '평택시', label: '평택시' },
          { value: '포천시', label: '포천시' },
          { value: '하남시', label: '하남시' },
          { value: '화성시', label: '화성시' },
        ]
      },
      {
        value: '강원도',
        label: '강원도',
        children: [
          { value: '강릉시', label: '강릉시' },
          { value: '고성군', label: '고성군' },
          { value: '동해시', label: '동해시' },
          { value: '삼척시', label: '삼척시' },
          { value: '속초시', label: '속초시' },
          { value: '양구군', label: '양구군' },
          { value: '양양군', label: '양양군' },
          { value: '영월군', label: '영월군' },
          { value: '원주시', label: '원주시' },
          { value: '인제군', label: '인제군' },
          { value: '정선군', label: '정선군' },
          { value: '철원군', label: '철원군' },
          { value: '춘천시', label: '춘천시' },
          { value: '태백시', label: '태백시' },
          { value: '평창군', label: '평창군' },
          { value: '홍천군', label: '홍천군' },
          { value: '화천군', label: '화천군' },
          { value: '횡성군', label: '횡성군' },
        ]
      },
      {
        value: '충청북도',
        label: '층청북도',
        children: [
          { value: '괴산군', label: '괴산군' },
          { value: '단양군', label: '단양군' },
          { value: '보은군', label: '보은군' },
          { value: '영동군', label: '영동군' },
          { value: '옥천군', label: '옥천군' },
          { value: '음성군', label: '음성군' },
          { value: '제천시', label: '제천시' },
          { value: '증평군', label: '증평군' },
          { value: '진천군', label: '진천군' },
          {
            value: '청주시',
            label: '청주시',
            children: [
              { value: '상당구', label: '상당구' },
              { value: '서원구', label: '서원구' },
              { value: '청원구', label: '청원구' },
              { value: '흥덕구', label: '흥덕구' },
            ]
          },
          { value: '충주시', label: '충주시' },
        ]
      },
      {
        value: '충청남도',
        label: '충청남도',
        children: [
          { value: '계룡시', label: '계룡시' },
          { value: '공주시', label: '공주시' },
          { value: '금산군', label: '금산군' },
          { value: '논산시', label: '논산시' },
          { value: '당진시', label: '당진시' },
          { value: '보령시', label: '보령시' },
          { value: '부여군', label: '부여군' },
          { value: '서산시', label: '서산시' },
          { value: '서천구', label: '서천구' },
          { value: '아산시', label: '아산시' },
          { value: '예산군', label: '예산군' },
          {
            value: '천안시',
            label: '천안시',
            children: [
              { value: '동남구', label: '동남구' },
              { value: '서북구', label: '서북구' },
            ]
          },
          { value: '청양군', label: '청양군' },
          { value: '태안군', label: '태안군' },
          { value: '홍성군', label: '홍성군' }
        ]
      },
      {
        value: '전라북도',
        label: '전라북도',
        children: [
          { value: '고창군', label: '고창군' },
          { value: '군산시', label: '군산시' },
          { value: '김제시', label: '김제시' },
          { value: '남원시', label: '남원시' },
          { value: '무주군', label: '무주군' },
          { value: '부안군', label: '부안군' },
          { value: '순창군', label: '순창군' },
          { value: '완주군', label: '완주군' },
          { value: '익산시', label: '익산시' },
          { value: '임실군', label: '임실군' },
          { value: '장수군', label: '장수군' },
          {
            value: '전주시',
            label: '전주시',
            children: [
              { value: '덕진구', label: '덕진구' },
              { value: '완산구', label: '완산구' },
            ]
          },
          { value: '정읍시', label: '정읍시' },
          { value: '진안군', label: '진안군' },
        ]
      },
      {
        value: '전라남도',
        label: '전라남도',
        children: [
          { value: '강진군', label: '강진군' },
          { value: '고흥군', label: '고흥군' },
          { value: '곡성군', label: '곡성군' },
          { value: '광양시', label: '광양시' },
          { value: '구례군', label: '구례군' },
          { value: '나주시', label: '나주시' },
          { value: '담양군', label: '담양군' },
          { value: '목포시', label: '목포시' },
          { value: '무안군', label: '무안군' },
          { value: '보성군', label: '보성군' },
          { value: '순천시', label: '순천시' },
          { value: '신안군', label: '신안군' },
          { value: '여수시', label: '여수시' },
          { value: '영광군', label: '영광군' },
          { value: '영암군', label: '영암군' },
          { value: '완도군', label: '완도군' },
          { value: '장성군', label: '장성군' },
          { value: '장흥군', label: '장흥군' },
          { value: '진도군', label: '진도군' },
          { value: '함평군', label: '함평군' },
          { value: '해남군', label: '해남군' },
          { value: '화순군', label: '화순군' },
        ]
      },
      {
        value: '경상북도',
        label: '경상북도',
        children: [
          { value: '경산시', label: '경산시' },
          { value: '경주시', label: '경주시' },
          { value: '고령군', label: '고령군' },
          { value: '구미시', label: '구미시' },
          { value: '군위군', label: '군위군' },
          { value: '김천시', label: '김천시' },
          { value: '문경시', label: '문경시' },
          { value: '봉화군', label: '봉화군' },
          { value: '상주시', label: '상주시' },
          { value: '성주군', label: '성주군' },
          { value: '안동시', label: '안동시' },
          { value: '영덕군', label: '영덕군' },
          { value: '영양군', label: '영양군' },
          { value: '영주시', label: '영주시' },
          { value: '영천시', label: '영천시' },
          { value: '예천군', label: '예천군' },
          { value: '울릉군', label: '울릉군' },
          { value: '울진군', label: '울진군' },
          { value: '의성군', label: '의성군' },
          { value: '청도군', label: '청도군' },
          { value: '청송군', label: '청송군' },
          { value: '칠곡군', label: '칠곡군' },
          {
            value: '포항시',
            label: '포항시',
            children: [
              { value: '남구', label: '남구' },
              { value: '북구', label: '북구' },
            ]
          },
        ]
      },
      {
        value: '경상남도',
        label: '경상남도',
        children: [
          { value: '거제시', label: '거제시' },
          { value: '거창군', label: '거창군' },
          { value: '고성군', label: '고성군' },
          { value: '김해시', label: '김해시' },
          { value: '남해군', label: '남해군' },
          { value: '밀양시', label: '밀양시' },
          { value: '사천시', label: '사천시' },
          { value: '산청군', label: '산청군' },
          { value: '양산시', label: '양산시' },
          { value: '의령군', label: '의령군' },
          { value: '진주시', label: '진주시' },
          { value: '창녕군', label: '창녕군' },
          {
            value: '창원시',
            label: '창원시',
            children: [
              { value: '마산합포구', label: '마산합포구' },
              { value: '마산회원구', label: '마산회원구' },
              { value: '성산구', label: '성산구' },
              { value: '의창구', label: '의창구' },
              { value: '진해구', label: '진해구' },
            ]
          },
          { value: '통영시', label: '통영시' },
          { value: '하동군', label: '하동군' },
          { value: '함안군', label: '함안군' },
          { value: '함양군', label: '함양군' },
          { value: '합천군', label: '합천군' },

        ]
      },
      {
        value: '제주특별자치도',
        label: '제주특별자치도',
        children: [
          { value: '서귀포시', label: '서귀포시' },
          { value: '제주시', label: '제주시' },
        ]
      },
    ],
  },
];

// upload-page-components
export const Layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

export const ColorArray = [
  '#63b598', '#ce7d78', '#ea9e70', '#a48a9e', '#c6e1e8', '#648177', '#0d5ac1',
  '#f205e6', '#1c0365', '#14a9ad', '#4ca2f9', '#a4e43f', '#d298e2', '#6119d0',
  '#d2737d', '#c0a43c', '#f2510e', '#651be6', '#79806e', '#61da5e', '#cd2f00',
  '#9348af', '#01ac53', '#c5a4fb', '#996635', '#b11573', '#4bb473', '#75d89e',
  '#2f3f94', '#2f7b99', '#da967d', '#34891f', '#b0d87b', '#ca4751', '#7e50a8',
  '#c4d647', '#e0eeb8', '#11dec1', '#289812', '#566ca0', '#ffdbe1', '#2f1179',
  '#935b6d', '#916988', '#513d98', '#aead3a', '#9e6d71', '#4b5bdc', '#0cd36d',
  '#250662', '#cb5bea', '#228916', '#ac3e1b', '#df514a', '#539397', '#880977',
  '#f697c1', '#ba96ce', '#679c9d', '#c6c42c', '#5d2c52', '#48b41b', '#e1cf3b',
  '#5be4f0', '#57c4d8', '#a4d17a', '#225b8', '#be608b', '#96b00c', '#088baf',
  '#f158bf', '#e145ba', '#ee91e3', '#05d371', '#5426e0', '#4834d0', '#802234',
  '#6749e8', '#0971f0', '#8fb413', '#b2b4f0', '#c3c89d', '#c9a941', '#41d158',
  '#fb21a3', '#51aed9', '#5bb32d', '#807fb', '#21538e', '#89d534', '#d36647',
  '#7fb411', '#0023b8', '#3b8c2a', '#986b53', '#f50422', '#983f7a', '#ea24a3',
  '#79352c', '#521250', '#c79ed2', '#d6dd92', '#e33e52', '#b2be57', '#fa06ec',
  '#1bb699', '#6b2e5f', '#64820f', '#1c271', '#21538e', '#89d534', '#d36647',
  '#7fb411', '#0023b8', '#3b8c2a', '#986b53', '#f50422', '#983f7a', '#ea24a3',
  '#79352c', '#521250', '#c79ed2', '#d6dd92', '#e33e52', '#b2be57', '#fa06ec',
  '#1bb699', '#6b2e5f', '#64820f', '#1c271', '#9cb64a', '#996c48', '#9ab9b7',
  '#06e052', '#e3a481', '#0eb621', '#fc458e', '#b2db15', '#aa226d', '#792ed8',
  '#73872a', '#520d3a', '#cefcb8', '#a5b3d9', '#7d1d85', '#c4fd57', '#f1ae16',
  '#8fe22a', '#ef6e3c', '#243eeb', '#1dc18', '#dd93fd', '#3f8473', '#e7dbce',
  '#421f79', '#7a3d93', '#635f6d', '#93f2d7', '#9b5c2a', '#15b9ee', '#0f5997',
  '#409188', '#911e20', '#1350ce', '#10e5b1', '#fff4d7', '#cb2582', '#ce00be',
  '#32d5d6', '#17232', '#608572', '#c79bc2', '#00f87c', '#77772a', '#6995ba',
  '#fc6b57', '#f07815', '#8fd883', '#060e27', '#96e591', '#21d52e', '#d00043',
  '#b47162', '#1ec227', '#4f0f6f', '#1d1d58', '#947002', '#bde052', '#e08c56',
  '#28fcfd', '#bb09b', '#36486a', '#d02e29', '#1ae6db', '#3e464c', '#a84a8f',
  '#911e7e', '#3f16d9', '#0f525f', '#ac7c0a', '#b4c086', '#c9d730', '#30cc49',
  '#3d6751', '#fb4c03', '#640fc1', '#62c03e', '#d3493a', '#88aa0b', '#406df9',
  '#615af0', '#4be47', '#2a3434', '#4a543f', '#79bca0', '#a8b8d4', '#00efd4',
  '#7ad236', '#7260d8', '#1deaa7', '#06f43a', '#823c59', '#e3d94c', '#dc1c06',
  '#f53b2a', '#b46238', '#2dfff6', '#a82b89', '#1a8011', '#436a9f', '#1a806a',
  '#4cf09d', '#c188a2', '#67eb4b', '#b308d3', '#fc7e41', '#af3101', '#ff065',
  '#71b1f4', '#a2f8a5', '#e23dd0', '#d3486d', '#00f7f9', '#474893', '#3cec35',
  '#1c65cb', '#5d1d0c', '#2d7d2a', '#ff3420', '#5cdd87', '#a259a4', '#e4ac44',
  '#1bede6', '#8798a4', '#d7790f', '#b2c24f', '#de73c2', '#d70a9c', '#25b67',
  '#88e9b8', '#c2b0e2', '#86e98f', '#ae90e2', '#1a806b', '#436a9e', '#0ec0ff',
  '#f812b3', '#b17fc9', '#8d6c2f', '#d3277a', '#2ca1ae', '#9685eb', '#8a96c6',
  '#dba2e6', '#76fc1b', '#608fa4', '#20f6ba', '#07d7f6', '#dce77a', '#77ecca'];
