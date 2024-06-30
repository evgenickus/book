import axios from "axios";
import { Form, Input, Button, message } from "antd"

export default function RegisterUser() {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi
      .open({
        type: 'loading',
        content: 'Registration in progress..',
        duration: 2.5,
      })
      .then(() => {
        message.success('You Have Been Registred Successfully!', 5)
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
    }).then(function () {

      success()

      // window.location = "/users";
    }).catch(function (error) {

      messageApi
        .open({
          type: 'loading',
          content: 'Registration in progress..',
          duration: 2.5,
        })
        .then(() => {
          message.error(error.response.status === 409 ? error.response.data.detail : error.response.data.detail[0].msg, 10)
        })
    })
  }

  return (

    <Form
      style={{ width: 900 }}
      autoComplete="off"
      onFinish={registerUser}
      // name="basic"
      labelCol={{ span: 8 }}
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
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
      </Form.Item>
      {contextHolder}
    </Form>

  )
}


