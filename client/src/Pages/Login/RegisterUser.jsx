import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function RegisterUser() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { username, password } = values;

    const url = "http://localhost:5000/api/user/login";

    const data = {
      username: username,
      password: password,
    };
    try {
      const result = await axios.post(url, data);
      if (result.data.successMsg) {
        message.info("User Logged in Successfully");
        navigate("/employeetable");
      }
    } catch (error) {
      console.log(error);
      message.warning("something went wrong");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{ backgroundColor: "lightgrey", padding: 70, borderRadius: 10 }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: 40, fontWeight: "600" }}
        >
          Login
        </h2>

        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
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
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RegisterUser;
