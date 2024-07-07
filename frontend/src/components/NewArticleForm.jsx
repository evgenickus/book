import { Button, Form , Input} from "antd";
import axios from "axios";

export const NewArticleForm = () => {

  const token = localStorage.getItem("token")

  const addArticle = (values) => {
    console.log(values.content);
     axios.post(`http://127.0.0.1:8000/articles/?title=${values.title}`, {
      content: values.content
     }, {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
     })
    }

   return (
    <Form 
    style={{ width: 900}}
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

    </Form>
   )
}