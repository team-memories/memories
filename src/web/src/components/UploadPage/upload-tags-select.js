import { Input, Form, Tag, Tooltip, AutoComplete } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '../constants';
import { PlusOutlined } from '@ant-design/icons';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const SEARCH_TAG_QUERY = gql`
  query ($queryStr: String!) {
    searchTag(queryStr: $queryStr) {
      name
    }
  }
`;

// TODO(sujin): tag 검색, 추가 바로 반영되도록
function UploadTagsSelect (props) {
  const [isEditing, setEditing] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const inputRef = useRef();
  const editInputRef = useRef();

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleClose = removedTag => {
    const t = props.tags.filter(tag => tag !== removedTag);
    props.onChange(t);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e);
    setSearchValue(e);
  };

  // 새로 입력한 태그를 tags 에 추가 -> inputVisible, inputValue, searchValue 초기화
  const handleInputConfirm = () => {
    if (inputValue && props.tags.indexOf(inputValue) === -1) {
      props.onChange([...props.tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
    setSearchValue('');
  };

  const handleEditInputChange = e => {
    setEditInputValue(e);
    setSearchValue(e);
  };

  // 기존에 입력한 태그 수정 -> editInputIndex, editInputValue, searchValue 초기화
  const handleEditInputConfirm = () => {
    const newTags = [...props.tags];
    newTags[editInputIndex] = editInputValue;

    props.onChange(newTags);
    setEditInputIndex(-1);
    setEditInputValue('');
    setSearchValue('');
  };

  // AutoComplete 의 옵션 설정: 기존에 등록되어 있는 태그에서 검색 (최대 3개)
  const handleSearch = (value) => {
    let result = !value
      ? []
      : data.searchTag.slice(0, 3).map((tag) => {return {value: tag.name};});

    setOptions(result);
  };

  const { error, data } = useQuery(SEARCH_TAG_QUERY, {
    variables: { queryStr: searchValue },
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: "cache-first",
  });
  if (error) return console.log(error);

  return (
    <Form.Item
      {...Layout}
      label="Tag"
    >
      <>
        {/* 입력했던 태그 수정 */}
        {/* 20자 이상인 경우 ...로 처리하고 tooltip 으로 tag 의 full name 을 설명해준다.*/}
        {props.tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <AutoComplete
                ref={editInputRef}
                key={tag}
                value={editInputValue}
                size="small"
                options={options}
                onBlur={handleEditInputConfirm}
                onChange={handleEditInputChange}
                onSearch={handleSearch}
                style={{width: '78px', marginRight: '8px', verticalAlign: 'top' }}
              />
            );
          }

          const isLongTag = tag.length > 20;

          // 20자 이상일 경우 ... 처리
          const tagElem = (
            <Tag
              style={{userSelect: 'none'}}
              key={tag}
              closable={index !== -1}
              onClose={() => handleClose(tag)}
            >
              <span
                onDoubleClick={e => {
                  if (index !== -1) {
                    setEditInputIndex(index);
                    setEditInputValue(tag);
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}

        {/* 새로 추가할 태그 (클릭 전) */}
        {!inputVisible && (
          <Tag onClick={showInput} style={{background: '#fff', borderStyle: 'dashed'}}>
            <PlusOutlined /> New Tag
          </Tag>
        )}

        {/* 새로 추가할 태그 (클릭 후) */}
        {inputVisible && (
          <AutoComplete
            ref={inputRef}
            value={inputValue}
            size="small"
            options={options}
            onBlur={handleInputConfirm}
            onChange={handleInputChange}
            onSearch={handleSearch}
            style={{width: '78px', marginRight: '8px', verticalAlign: 'top' }}
          />
        )}
      </>
    </Form.Item>
  );
}

export default UploadTagsSelect;
