const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    media(id: ID!): Media!
    """
    미디어 검색
    """
    search(
      """
      queryStr: 검색어. title, description, category 등 다양한 정보를 대상으로 검색하기 위해.
      """
      queryStr: String
      location: String
      yearFrom: Int
      yearTo: Int
    ): [Media]!
    searchTag(queryStr: String): [Tag]!
    user(id: ID!): User!
    myMedia: [Media]!
    tags: [Tag]
  }

  type Mutation {
    uploadMedia(
      media: Upload!
      title: String!
      location: String!
      year: Int!
      description: String!
      tagNames: [String]!
    ): Media
    deleteMedia(id: ID!): Media
    """
    게시되어 있는 글을 수정하려면 현재 게시되어 있는 글의 정보를 보여주며 수정할 수 있는 페이지를 제공하고
    사용자가 수정하고 싶은 정보를 자유롭게 수정하게 한 뒤, 바뀌지 않은 정보들도 함께 다시 서버로 전송하세요. (데이터의 일관성을 위해)
    """
    modifyMedia(
      """
      id: 수정할 media의 ID
      """
      id: ID!
      title: String!
      location: String!
      year: Int!
      description: String!
      tagNames: [String]!
    ): Media

    createComment(mediaId: ID!, content: String!): Comment
    deleteComment(
      """
      id: Comment의 ID
      """
      id: ID!
    ): Comment
    modifyComment(id: ID!, content: String!): Comment
    signInWithGoogle(googleId: String!): AuthPayload!
    signUpWithGoogle(
      googleId: String!
      email: String!
      name: String!
      profileImgUrl: String
    ): AuthPayload!
    signUp(email: String!, password: String!, name: String!): AuthPayload!
    signIn(email: String!, password: String!): AuthPayload!
    deactivateUser(id: ID!): User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  interface Media {
    id: ID!
    title: String
    thumbnailUrl: String!
    originalUrl: String!
    """
    미디어 파일이 저장되어 있는 주소
    """
    url: String!
    author: User
    location: String
    year: Int
    description: String
    isActive: Boolean
    """
    서버에서 미디어 파일의 변환 및 업로드 작업이 진행중이라면 True
    완료되어서 미디어 조회가 가능하다면 False
    """
    underProcessing: Boolean
    comments: [Comment]
    tags: [Tag]!
  }

  """
  현재로선, Photo type과 Video type간의 다른 점은 없다.
  특정 field에서 Media interface을 반환할 시
  실제로 반환하는 type이 Photo이냐 Video냐에 따라
  클라이언트 단에서 다르게 렌더링하기 위해 구현하였다.
  """
  type Photo implements Media {
    id: ID!
    title: String
    thumbnailUrl: String!
    originalUrl: String!
    """
    미디어 파일이 저장되어 있는 주소
    """
    url: String!
    author: User
    location: String
    year: Int
    description: String
    isActive: Boolean
    """
    서버에서 미디어 파일의 변환 및 업로드 작업이 진행중이라면 True
    완료되어서 미디어 조회가 가능하다면 False
    """
    underProcessing: Boolean
    comments: [Comment]
    tags: [Tag]!
  }

  type Video implements Media {
    id: ID!
    title: String
    thumbnailUrl: String!
    originalUrl: String!
    """
    미디어 파일이 저장되어 있는 주소
    """
    url: String!
    author: User
    location: String
    year: Int
    description: String
    isActive: Boolean
    """
    서버에서 미디어 파일의 변환 및 업로드 작업이 진행중이라면 True
    완료되어서 미디어 조회가 가능하다면 False
    """
    underProcessing: Boolean
    comments: [Comment]
    tags: [Tag]!
  }

  type User {
    """
    일반적 사이트 로그인에 사용되는 그 아이디가 아니다.
    유저의 고유 번호를 나타낸다.
    """
    id: ID!
    email: String
    name: String
    profileImgUrl: String
    isActive: Boolean
    myMedia: [Media]!
  }

  type Comment {
    id: ID!
    author: User
    """
    댓글의 내용
    """
    content: String
    isActive: Boolean
  }

  type Tag {
    id: ID!
    name: String!
  }
`;

module.exports = typeDefs;
