import React, {FC, useState} from 'react';
import {Button, Form, Input, Row, Typography} from "antd";
import {rules} from "../utils/rules";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/actions-creators";
import {useTypedSelector} from "../hooks/useTypedSelector";

const LoginForm: FC = () => {
    const dispatch = useDispatch()
    const {isLoading, error, isAuth} = useTypedSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = (values: any) => {
        const {username, password} = values
        dispatch(AuthActionCreators.login(username, password))
    };

    return (
        <Form name="basic"
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              initialValues={{remember: true}}
              onFinish={submit}
              autoComplete="off"
        >
            <Row justify={'center'}>
                {error && <Typography.Text type={'danger'}>{error}</Typography.Text>}
            </Row>
            <Form.Item label="Username"
                       name="username"
                       rules={[rules.required('Please input your username!')]}
            >
                <Input value={username} onChange={e => setUsername(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Password"
                       name="password"
                       rules={[rules.required('Please input your password!')]}
            >
                <Input.Password value={password} onChange={e => setPassword(e.target.value)}/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit" loading={isLoading} disabled={isAuth}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm