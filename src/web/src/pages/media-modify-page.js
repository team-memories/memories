import React, { useState } from 'react';
import { Form, message } from 'antd';
import { useHistory, withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import UploadPageTitle from '../components/UploadPage/upload-page-title';
import UploadYearSelect from '../components/UploadPage/upload-year-select';
import UploadPlaceSelect from '../components/UploadPage/upload-place-select';
import UploadCategorySelect from '../components/UploadPage/upload-category-select';
import UploadSubmitButton from '../components/UploadPage/upload-submit-button';
import UploadPageDescription from '../components/UploadPage/upload-description';

const MODIFY_MEDIA = gql`
  mutation ($id: ID!, $title: String!, $location: String!, $year: Int!, $description: String!, $category: Category) {
    modifyMedia(
      id : $id
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

function ModifyPage (props) {
  const media = props.location.state.media;
  const { useMutation } = require('@apollo/react-hooks');
  const [title, setTitle] = useState(media.title);
  const [location, setLocation] = useState('대한민국');
  const [category, setCategory] = useState(media.category);
  const [year, setYear] = useState(new Date().getFullYear(media.year));
  const [description, setDescription] = useState(media.description);
  const [mutate] = useMutation(MODIFY_MEDIA,
    {
      // mutation 보내면 refetching
      refetchQueries: [{
        query: props.location.state.GET_MEDIA, variables: { mediaId: media.id }
      }]
    }
  );
  const history = useHistory();

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
    mutate({ variables: { id: media.id, title: title, location: location, year: year, description: description, category: category } })
      .then(() => {
        message.info('제출 완료되었습니다.');
        history.goBack();
      })
      .catch(e => {
        message.error('수정에 실패하였습니다.');
        console.log(e);
      });
  };
  props.onChangeIsMediaView(window.location.pathname === "/watch");
  return (
    <div style={{ maxWidth: '750px', margin: '4.5rem auto' }}>
      <Form>
        {
          (media.__typename === "Photo") ?
          <img src={media.url} width={"100%"} style={{marginBottom: "6%"}}/>
          :
          <video src={props.media.url} width={"100%"} style={{marginBottom: "6%"}} controls/>
        }
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

export default withRouter(ModifyPage);