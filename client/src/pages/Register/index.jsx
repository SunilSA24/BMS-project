import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../../apiCalls/user";

function Register() {
  const [messageApi, contentHeader] = message.useMessage();
  const navigate = useNavigate()

  const onFinish = async (value) => {
    try {
      const response = await RegisterUser(value);
      if (response.success) {
        message.open({
          type: "success",
          content: "Registration successful",
        })
        navigate("/login");
      } else {
        messageApi.open({
          type: "error",
          content: response.message,
        })
      }
    } catch (err) {
      messageApi.open({
          type: "error",
          content: err,
        });
    }
  }
  return (
    <div>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Login to BMS</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Email"
                htmlFor="email"
                name={"email"}
                className="d-block"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Please, enter a valid email" },
                ]}
              >
                <Input type="email" placeholder="Enter your email"></Input>
              </Form.Item>

              <Form.Item
                label="Password"
                htmlFor="password"
                name={"password"}
                className="d-block"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input
                  type="password"
                  placeholder="Enter your password"
                ></Input>
              </Form.Item>

              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            <div>
              <p>
                New User? <Link to="/register">Register Here</Link>
              </p>
              <p>
                Forgot Password? <Link to="/forget">Click Here</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </div>
  )
}

export default Register