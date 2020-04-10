/*====================================
*              UploadPage
* ====================================
*
* 영상, Title, 장소, 시간을 설정한다.
* TODO (Sujin) : mutation - Media 파일 안올라가는 거 수정
*/

import React, {useState} from 'react';
import {Form} from 'antd';
import gql from "graphql-tag";

import UploadPageTitle from "../components/UploadPage/UploadPageTitle";
import UploadDateSelect from "../components/UploadPage/UploadDateSelect";
import UploadPlaceSelect from "../components/UploadPage/UploadPlaceSelect";
import UploadSubmitButton from "../components/UploadPage/UploadSubmitButton";
import UploadPageDescription from "../components/UploadPage/UploadDescription";
import DropzoneBox from "../components/UploadPage/DropzoneBox";

const UPLOAD_MEDIA = gql`
    mutation ($media: Upload!, $title: String!, $location: String!, $date: Date!) {
        uploadMedia(
            media: $media
            title: $title
            location: $location
            date: $date
        ) {
            title
            location
            date
        }
    }
`;

function UploadPage() {
    const {useMutation} = require('@apollo/react-hooks');

    const [media, setMedia] = useState([]);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('대한민국');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [mutate] = useMutation(UPLOAD_MEDIA);

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

    const onDateChange = (date, dateString) => {
        setDate(dateString);
    };

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = () => {
        // console.log(media, title, location, date);
        // mutate({variables: {media, title, location, date}})
        //     .then();
        alert('Submit!');
    };

    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <Form>
                <DropzoneBox onChange={onMediaChange} mediaName={media.name}/>
                <UploadPageTitle title={title} onChange={onTitleChange}/>
                <UploadPlaceSelect location={location} onChange={onLocationChange}/>
                <UploadDateSelect date={date} onChange={onDateChange}/>
                <UploadPageDescription description={description} onChange={onDescriptionChange}/>
                {/*TODO (Sujin) : onCLick 시 mutation 올바르게 올라가게 */}
                <UploadSubmitButton onClick={handleSubmit}/>

            </Form>
        </div>
    )
}

export default UploadPage
