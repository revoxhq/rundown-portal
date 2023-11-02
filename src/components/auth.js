import React, { useState } from 'react';
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { Button, Checkbox, Form, Input, Tooltip, Space } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = auth.currentUser;

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        }
        catch (err) {
            console.error(err);
        }
    };
    const signInwithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        }
        catch (err) {
            console.error(err);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
        }
        catch (err) {
            console.error(err);
        }
    };

    if (user) {
        return <Navigate to="/home" replace={true} />
    }

    //returns the current logged in users email
    // console.log(auth?.currentUser?.email);

    return (
        <div>
            <Space wrap direction="vertical">
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
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button onClick={signIn} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
                <Button onClick={signInwithGoogle} icon={<GoogleOutlined />}>Login with Google</Button>
                <Button type="link" block onClick={logOut}>
                    Log Out
                </Button>
            </Space>

        </div >

    );
};
