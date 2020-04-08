import {Form} from "antd";
import React from "react";

const layout = {
    labelCol: {span: 3},
    wrapperCol: {offset: 3, span: 16},
};

/*
* Input File 작성
* */

function InputFile(props) {
    return (
        <Form.Item {...layout}>
            <input type='file' onChange={props.onChange}/>
        </Form.Item>
    )
}

export default InputFile;
