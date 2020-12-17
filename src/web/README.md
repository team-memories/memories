# 기술 설명
Web app 개발은 React와 React Router, Apollo Client등을 사용해서 진행하였다. React를 사용하여 컴포넌트 단위의 개발을 순조롭게 하였으며, React Router를 사용하여 React로 만든 Single Page Application(SPA)에서의 Routing을 가능케 하고, 서버와 GraphQL을 이용하여 커뮤니케이션 하기 위한 라이브러리이자, State management 라이브러리로써는 Apollo Client를 사용한다. Static data(변환 전의 미디어, 변환 후의 미디어)는 Amazon S3에 저장되기 때문에 미디어 열람시 Amazon S3에서 파일을 받아온다.

- React: Single Page Application으로써 Component 단위로 개발하기 위해 사용
- Apollo Client: 서버와 GraphQL로 통신하기 위해 사용
- React Router: Single Page Application에서 URL을 이용한 Routing을 하기
위해 사용
- AntD: React UI 라이브러리
- Jest: Unit Test를 진행하기 위해서 사용한 JavaScript 테스트 프레임 워크
- react-test-renderer: unit test를 진행할 때 react 컴포넌트를 렌더링하기 위해서 사용
