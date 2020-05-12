import React from 'react';
import Dropzone from 'react-dropzone';
import { InboxOutlined } from '@ant-design/icons';
import { Form } from 'antd';

const layout = {
  wrapperCol: { offset: 4, span: 16 },
};

function DropzoneBox (props) {
  return (
    <Form.Item
      {...layout}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Dropzone
          type="file"
          multiple={false}
          onDrop={props.onChange}
          required
        >
          {({ getRootProps, getInputProps }) => (
            <div
              style={{
                width: '750px',
                height: '150px',
                border: '1px dashed lightgray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              {...getRootProps()}>
              <input {...getInputProps()} />
              {props.mediaName ?
                <p>{props.mediaName}</p> :
                <>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </>
              }
            </div>
          )}
        </Dropzone>
      </div>
    </Form.Item>
  );
}

export default DropzoneBox;