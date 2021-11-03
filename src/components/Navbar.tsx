import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../routes";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/actions-creators";

const Navbar: FC = () => {
    const router = useHistory()
    const dispatch = useDispatch()
    const {isAuth, user} = useTypedSelector(state => state.auth)
    return (
        <Layout.Header>
            <Row>
                {
                    isAuth ?
                        <>
                            <div style={{color: 'white'}}>
                                {user.username}
                            </div>
                            <Menu theme="dark" mode="horizontal" selectable={false}>
                                <Menu.Item onClick={() => dispatch(AuthActionCreators.logout())} key={1}>Exit</Menu.Item>
                            </Menu>
                        </>
                        :
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item onClick={() => router.push(RouteNames.LOGIN)} key={1}>Login</Menu.Item>
                        </Menu>
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;