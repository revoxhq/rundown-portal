import React, { useState } from 'react';
import { InboxOutlined, HomeOutlined, FireOutlined } from '@ant-design/icons';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import { Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import { auth } from "./config/firebase";
import { Navigate } from 'react-router-dom';

const items = [
    {
        label: (
            <CustomLink to={'/home'}>Home</CustomLink>
        ),
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: (
            <CustomLink to={'/assets'}>Assets</CustomLink>
        ),
        key: 'assets',
        icon: <FireOutlined />,
    },
    {
        label: (
            <CustomLink to={'/resources'}>Resources</CustomLink>
        ),
        key: 'resources',
        icon: <InboxOutlined />,
    },
    // {
    //     label: (
    //         <Button type="link">Sign out</Button>
    //     ),
    //     key: 'documents',
    //     icon: <SettingOutlined />,
    // },
];

const logOut = async () => {
    try {
        await signOut(auth).then((result) => {
            <Navigate to="/" replace={true} />
        });
    }
    catch (err) {
        console.error(err);
    }
};

export const NavBar = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <div className='nav-bar-wrapper'>
            <Menu onClick={onClick} style={{minWidth: '800px'}} selectedKeys={[current]} mode="horizontal" items={items} />
            <Button type="link" onClick={logOut}>Sign out</Button>
        </div>

    );
}
function CustomLink({ to, children, ...props }) {
    return (
        <Link to={to} {...props}>
            {children}
        </Link>
    )
}