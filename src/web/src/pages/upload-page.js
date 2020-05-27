import React, { useState } from 'react';
import { Form, message } from 'antd';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import UploadPageTitle from '../components/UploadPage/upload-page-title';
import UploadYearSelect from '../components/UploadPage/upload-year-select';
import UploadPlaceSelect from '../components/UploadPage/upload-place-select';
import UploadCategorySelect from '../components/UploadPage/upload-category-select';
import UploadSubmitButton from '../components/UploadPage/upload-submit-button';
import UploadPageDescription from '../components/UploadPage/upload-description';
import DropzoneBox from '../components/UploadPage/dropzone-box';

const UPLOAD_MEDIA = gql`
    mutation ($media: Upload!, $title: String!, $location: String!, $year: Int!, $description: String!, $category: Category) {
        uploadMedia(
            media: $media
            title: $title
            location: $location
            year: $year
            description: $description
            category: $category
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
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('대한민국');
  const [category, setCategory] = useState();
  const [year, setYear] = useState(new Date().getFullYear());
  const [description, setDescription] = useState('');
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

  const onCategoryChange = (e) => {
    setCategory(e);
  };

  const handleSubmit = () => {
    mutate({ variables: { media, title, location, year, description, category } })
      .then(() => {
        message.info('제출 완료되었습니다.');
        history.push('/');
      })
      .catch(e => {
        message.error('업로드에 실패하였습니다.');
        console.log(e);
        // console.log(e.networkError.result.errors);
      });
  };
  props.onChangeIsMediaView(window.location.pathname === "/watch");
  return (
    <div style={{ maxWidth: '750px', margin: '4.5rem auto' }}>
      <Form>
        <DropzoneBox onChange={onMediaChange} mediaName={media.name}/>
        <UploadPageTitle title={title} onChange={onTitleChange}/>
        <UploadPlaceSelect location={location} onChange={onLocationChange}/>
        <UploadCategorySelect category={category} onChange={onCategoryChange}/>
        <UploadYearSelect year={year} onChange={onYearChange}/>
        <UploadPageDescription description={description} onChange={onDescriptionChange}/>
        <UploadSubmitButton onClick={handleSubmit}/>
      </Form>
    </div>
  );
}

export default UploadPage;
