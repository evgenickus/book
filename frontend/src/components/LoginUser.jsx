import { Button, Form, Input, message } from "antd"
import axios from "axios"
import AppContext from "./context/AppContext";
import { useContext } from "react";




export const LoginUser = () => {
  const { setLogin, setCurrentUser } = useContext(AppContext)
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi
      .open({
        type: 'loading',
        content: 'Login in progress..',
        duration: 2.5,
      })
      .then(() => {
        message.success('You Have Been Login Successfully!', 3)
      })
  };


  const formSubmit = (values) => {
    axios.post("http://127.0.0.1:8000/token/", {
      username: values.username,
      password: values.password
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    })
      .then(function (resp) {
        localStorage.setItem("token", resp.data.access_token);
        success(values.username);
        setTimeout(() => {
          setLogin(false);
          setCurrentUser(values.username);
        }, 5500);
        // setCurrentUser(values.username)
      })
      .catch(function (error) {
        messageApi
          .open({
            type: 'loading',
            content: 'Login in progress..',
            duration: 2.5,
          })
          .then(() => {
            message.error(error.response.data.detail, 5)
          })
      })
  };

  return (
    <Form
      onFinish={formSubmit}>
      <Form.Item
        label="Username"
        name="username">
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password">
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit">
          Login
        </Button>
      </Form.Item>
      {contextHolder}
    </Form>
  )
}