import { Button, Form, Input, message } from "antd";
import axios from "axios";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


export const NewArticleForm = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const token = localStorage.getItem("token")
  const { addNewArticle, setLogin } = useContext(AppContext)
  const navigate = useNavigate()


  const success = () => {
    messageApi
      .open({
        type: 'loading',
        content: 'Please wait..',
        duration: 1.5,
      })
      .then(() => {
        message.success('Article Has Been Added Successfully!', 2)
      })
  };

  const addArticle = (values) => {
    axios.post(`http://127.0.0.1:8000/articles/?title=${values.title}`, values.content,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(function (resp) {
        success();
        setTimeout(() => {
          addNewArticle(resp.data)
        }, 1500);
      })
      .catch(function (error) {
        messageApi
          .open({
            type: 'loading',
            content: 'Please wait..',
            duration: 1.5,
          })
          .then(() => {
            message.error(error.response.status == 401 && "You Are Not Authorized", 5)
            setTimeout(() => {
              navigate("/login");
              setLogin(false)
            }, 6500);
          }
          )
      })
  }

  return (
    <Form
      style={{ width: 900 }}
      autoComplete="off"
      labelCol={{ span: 8 }}
      onFinish={addArticle}
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
        <Input />
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
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 21,
          span: 16
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
        >
          Add Article
        </Button>
      </Form.Item>
      {contextHolder}
    </Form>
  )
}