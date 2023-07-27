import React from 'react'
import { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { UserAddOutlined, MailTwoTone, LockTwoTone } from '@ant-design/icons';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/users/register", values);
      message.success("Registration Successfull");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("User already exist");
    }
  };


  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);  //if navigate is changed then useEffect will run
  return (
    <>
      <div className="form-container ">
        {loading && <Spinner />}

        <Form
          layout="vertical"
          onFinish={submitHandler}
          className="register-form"
        >
          <h3 className="text-center">Register From</h3>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your passowrd!' }]}>
            <Input prefix={<UserAddOutlined className="site-form-item-icon" />}
              type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input prefix={<MailTwoTone className="site-form-item-icon" />}
              type="email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: "please input your password!" }]}>
            <Input prefix={<LockTwoTone className="site-form-item-icon" />}
              type="password" />

          </Form.Item>
          <Link to="/login" className="m-2">
            Already User ? Login Here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
