import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { Button, Form, Input, Tooltip, Space } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';



export const Auth = () => {


    // const user = auth.currentUser;
    const [logingError, setError] = useState(false);
    const [user, setUser] = useState(auth.currentUser);

    // useEffect(() => {
    //     auth().onAuthStateChanged(setUser)
    // }, [])

    const signInwithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider).then((result) => {
                setUser(result.user);
            });
        }
        catch (err) {
            console.error(err.message);
            setError(true)
        }
    };


    if (user || auth.currentUser) {
        console.log(auth.currentUser);
        return <Navigate to="/" replace={true} />
    }

    return (
        <div className='login-page'>
            <div className='carosel-video-wrappers'>
                <div className='video-filter'></div>
                <video src='/videos/website.mp4' className='carosel-video d-block w-100' webkit-playsinline={"true"} autoPlay muted playsInline loop>
                </video>
            </div>


            <div className='login-wrapper'>
                <Space wrap direction="vertical">

                    <div className='login-inner-video-wrapper'>
                        <video src='/videos/our-begin.mp4' className='login-video d-block w-100' webkit-playsinline={"true"} autoPlay muted playsInline loop>
                        </video>
                    </div>

                    <div className='login-inner-bottom-wrapper'>
                        <h2>Welcome to the Rundown Studios Portal</h2>
                        <label className='m-b-15'>Sign in with your studio email to continue</label>
                    </div>

                    {logingError &&
                        <div className='login-error'>
                            <label>Login Error</label>
                            <label>Note: Only studio accounts and company accounts are allowed to login</label>
                        </div>
                    }

                    <Button size={'large'} onClick={signInwithGoogle} icon={<GoogleOutlined />}>Login with Google</Button>

                </Space>
            </div>


        </div >

    );
};
