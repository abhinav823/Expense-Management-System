import React, {  useEffect } from "react";
import { Form, Input, message, } from "antd";
import { Link, useNavigate } from "react-router-dom"; //link is used for redirecting to another page and useNavigate is used for redirecting to another page after some action
import axios from "axios";
import { MailTwoTone, UnlockTwoTone } from '@ant-design/icons';

const Login = () => {
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try { 
      const { data } = await axios.post("/api/v1/users/login", values);
      message.success("Login Successfull");
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
      navigate("/");
    } catch (error) {
      message.error("Invalid Credentials");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);


  return (
    <div className="form-container ">
      <Form
        layout="vertical"
        onFinish={submitHandler}
        className="register-form"
      >
        <h3 className="text-center">Login Form</h3>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input prefix={<MailTwoTone className="site-form-item-icon" />}
            type="email" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: "please input your password!" }]}>
          <Input prefix={<UnlockTwoTone className="site-form-item-icon" />}
            type="password" />
        </Form.Item>

        <Link to="/register" className="m-2">
          Not a User ? Register here
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};







export default Login;