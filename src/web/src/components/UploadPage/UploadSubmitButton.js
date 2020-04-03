import React from "react";
import {Button, Form} from "antd";

const tailLayout = {
    wrapperCol: {offset: 3, span: 16},
};

const UPLOAD_MEDIA = gql`
    mutation ($media: Upload!, $title: String!, $location: String!, $date: Date!) {
        uploadMedia(
            media: $media
            title: $title
            location: $location
            date: $date
        ) {
            id
            title
            url
            location
            date
            description
        }
    }
`;

/*
* Submit 버튼 : 버튼을 누르면 Form 내용을 서버에 전송한다.
* */

function UploadSubmitButton(props) {
    return (
        <Form.Item {...tailLayout}>
            <Button
                type="primary"
                size="large"
                onClick={props.onClick}
            >
                Submit
            </Button>
        </Form.Item>
    )
}

export default UploadSubmitButton;