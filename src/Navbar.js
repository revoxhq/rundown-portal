import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';


const items = [
    {
        label: (
            <a href="/home">
                Home
            </a>
        ),
        key: 'mail',
        icon: <MailOutlined />,
    },
    {
        label: (
            <a href="/assets">
                Assets
            </a>
        ),
        key: 'app',
        icon: <AppstoreOutlined />,
    },
    {
        label: (
            <a href="/documents">
                Documents
            </a>
        ),
        key: 'SubMenu',
        icon: <SettingOutlined />,
    },
];

export const NavBar = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    );
}