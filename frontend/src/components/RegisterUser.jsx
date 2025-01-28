import axios from "axios";
import { Form, Input, Button, message } from "antd";
import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const { setLogin, setCurrentUser, addUser, setMenuKey, setAuth } = useContext(AppContext);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()

  useEffect(() => {
    setMenuKey('register')
  }, [])

  const success = () => {
    messageApi
      .open({
        type: 'loading',
        content: 'Registration in progress..',
        duration: 1.5,
      })
      .then(() => {
        message.success('You Have Been Registred Successfully!', 2)
      })
  };

  const registerUser = (values) => {
    axios.post("http://127.0.0.1:8000/users/", {
      username: values.username,
      password: values.password,
      email: values.email
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function (resp) {
        // localStorage.setItem("token", resp.data.access_token);
        success();
        setTimeout(() => {
          // setLogin(true);
          // setAuth(true)
          // setCurrentUser(values.username);
          addUser(resp.data);
          navigate("/login");
        }, 5500);
      })
      .catch(function (error) {
        messageApi
          .open({
            type: 'loading',
            content: 'Registration in progress..',
            duration: 1.5,
          })
          .then(() => {
            message.error(error.response.status === 409 ? error.response.data.detail : error.response.data.detail[0].msg, 7)
          })
      })
  }

  return (

    <Form
      // style={{ width: 900 }}
      autoComplete="off"
      onFinish={registerUser}
      // name="basic"
      // labelCol={{ span: 8 }}
    // wrapperCol={{ span: 16 }}
    // initialValues={{ remember: true }}
    >
      <Form.Item
        label="Usename"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username"
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please inter you password"
          }
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please inter you email"
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      {contextHolder}
    </Form>

  )
}


