import React, { useState } from 'react';
import { Button, Flex, Form, Input, Modal, message } from 'antd';
import { NewArticleForm } from './NewArticleForm';
import useMessage from 'antd/es/message/useMessage';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const NewArticleModal = ( {hook, state} ) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { addNewArticle, setLogin } = useContext(AppContext)
  const [messageApi, contextHolder] = message.useMessage();
  const token = localStorage.getItem("token")
  const navigate = useNavigate();
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);


  const success = () => {
    messageApi.open({
      type: "success",
      content: "Article Has Been Added Successfully!",
      duration: 1.5
    })
  };
  

  const handleCancel = () => {
    hook(false);
  };

  const addArticle = () => {
    setConfirmLoading(true);

    axios.post(`http://127.0.0.1:8000/articles/?title=${title}`, content,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(function (resp) {
        setTimeout(() => {
          success();
          addNewArticle(resp.data)
          setConfirmLoading(false);
        }, 1500);
        setTimeout(() => {
          hook(false);
        }, 4000);
      })
      .catch(function (error) {
        messageApi.open({
          type: 'error',
          content: "You Are Not Authorized",
          duration: 1.5,
        })
        setTimeout(() => {
          setConfirmLoading(false);
          navigate("/login");
          setLogin(false)
        }, 3500);
      })
  };

  return (
    <>
      <Modal
        width={900}
        title="Add New Post"
        open={state}
        okText={"Add"}
        onOk={addArticle}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
        style={{ height: 350 }}
        autoComplete="off"
        labelCol={{ span: 2 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please inter article title"
              }
            ]}
          >
            <Input value={title} onChange={v => setTitle(v.target.value)} />
          </Form.Item>
            <Form.Item
            label="Content"
            name="content"
            rules={[
              {
                required: true,
                message: "Please inter article content"
              }
            ]}
          >

            <Input.TextArea
              autoSize={{minRows:12, maxRows: 12}}
              value={content}
              onChange={v => setContent(v.target.value)}
            />
          </Form.Item>

          {contextHolder}
        </Form>
      </Modal>
    </>
  );
};