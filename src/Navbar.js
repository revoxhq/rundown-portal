import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const items = [
    {
        label: (
            <CustomLink to={'/home'}>Home</CustomLink>
        ),
        key: 'home',
        icon: <MailOutlined />,
    },
    {
        label: (
            <CustomLink to={'/assets'}>Assets</CustomLink>
        ),
        key: 'assets',
        icon: <AppstoreOutlined />,
    },
    {
        label: (
            <CustomLink to={'/resources'}>Resources</CustomLink>
        ),
        key: 'resources',
        icon: <AppstoreOutlined />,
    },
    {
        label: (
            <CustomLink to={'/documents'}>Documents</CustomLink>
        ),
        key: 'documents',
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
function CustomLink({ to, children, ...props }) {
    return (
        <Link to={to} {...props}>
            {children}
        </Link>
    )
}