import React, { useState } from 'react';
import { Form, message } from 'antd';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import UploadPageTitle from '../components/UploadPage/upload-page-title';
import UploadYearSelect from '../components/UploadPage/upload-year-select';
import UploadPlaceSelect from '../components/UploadPage/upload-place-select';
import UploadTagsSelect from '../components/UploadPage/upload-tags-select';
import UploadSubmitButton from '../components/UploadPage/upload-submit-button';
import UploadPageDescription from '../components/UploadPage/upload-description';
import DropzoneBox from '../components/UploadPage/dropzone-box';

const UPLOAD_MEDIA = gql`
    mutation ($media: Upload!, $title: String!, $location: String!, $year: Int!, $description: String!, $tags: [String!]) {
        uploadMedia(
            media: $media
            title: $title
            location: $location
            year: $year
            description: $description
            tagNames: $tags
        ) {
            id
            title
            thumbnailUrl
            originalUrl
            url
            author {
                id
                name
            }
        }
    }
`;

function UploadPage (props) {
  const { useMutation } = require('@apollo/react-hooks');
  const [media, setMedia] = useState([]);
  const [title, setTitle] = useState();
  const [location, setLocation] = useState('대한민국');
  const [tags, setTags] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [description, setDescription] = useState();
  const [isSubmitCliked, setClicked] = useState(false);
  const [mutate] = useMutation(UPLOAD_MEDIA);
  const history = useHistory();

  const onMediaChange = (e) => {
    setMedia(e[0]);
    console.log(e[0]);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onLocationChange = (e) => {
    setLocation(e.join(' '));
  };

  const onYearChange = (year, yearString) => {
    setYear(parseInt(yearString));
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onTagsChange = (e) => {
    setTags(e);
  };

  const handleSubmit = () => {
    if (media.path === undefined) {
      message.error("파일을 업로드해주세요.");
    }
    else if (sessionStorage.getItem('user_id') !== "1" && sessionStorage.getItem('user_id') !== "3" && sessionStorage.getItem('user_id') !== "4" && sessionStorage.getItem('user_id') !== "5" &&
    sessionStorage.getItem('user_id') !== "6" && sessionStorage.getItem('user_id') !== "7") {
      message.error("현재는 승인된 계정만 업로드 할 수 있습니다.");
    }
    else if (title === "" || title === undefined || description === "" || description === undefined) {
      message.error("모든 정보를 입력해주세요.");
    }
    else {
      setClicked(true);
      mutate({ variables: { media, title, location, year, description, tags } })
        .then(() => {
          message.info('제출 완료되었습니다.');
          history.push('/');
        })
        .catch(e => {
          message.error('업로드에 실패하였습니다.');
          setClicked(false);
          console.log(e);
        });
    }
  };
  props.onChangeIsMediaView(window.location.pathname === "/watch");
  return (
    <div style={{ maxWidth: '750px', margin: '4.5rem auto' }}>
      <Form>
        <DropzoneBox onChange={onMediaChange} mediaName={media.name}/>
        <UploadPageTitle title={title} onChange={onTitleChange}/>
        <UploadPlaceSelect location={location} onChange={onLocationChange}/>
        <UploadTagsSelect tags={tags} onChange={onTagsChange}/>
        <UploadYearSelect year={year} onChange={onYearChange}/>
        <UploadPageDescription description={description} onChange={onDescriptionChange}/>
        <UploadSubmitButton onClick={handleSubmit} isSubmit={isSubmitCliked}/>
      </Form>
    </div>
  );
}

export default UploadPage;
