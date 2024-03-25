import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form, Input, Slider, Select, Typography, Space, Tag, Steps } from 'antd';
import { addDoc, collection } from 'firebase/firestore';
import { db } from "../../../config/firebase";
import { PlusCircleOutlined, CheckOutlined, UserOutlined, MehOutlined } from '@ant-design/icons';



export const EditAsset = () => {

    const [form] = Form.useForm();
    const [currentClient, setCurrentClient] = useState("Revox");
    const { CheckableTag } = Tag;
    const [selectedTags, setSelectedTags] = useState([]);
    const { Title } = Typography;
    const [currentStep, setCurrentProgress] = useState(0);
    const [currentProgress, saveUpdatedProgress] = useState({});
    const { TextArea } = Input;

    const onFinish = (values) => {
        console.log('Submitting:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onProjectChange = (e) => {
        switch (e) {
            case "Internal":
                setCurrentClient("Revox")
                break;
            case "Spiral":
                setCurrentClient("Revox")
                break;
            case "Starwalker":
                setCurrentClient("Marius")
                break;
            case "Goodness Game":
                setCurrentClient("Foundation of Goodness")
                break;
            case "Other":
                setCurrentClient("Unknown")
                break;
            default:
                setCurrentClient("Unknown")
                break;
        }
    };

    const tagsData = ["Architecture",
        "Sci-Fi",
        "Realistic",
        "Low-Poly",
        "Modern",
        "Fantasy",
        "Steam/Cyber punk",
        "Horror",
        "Medieval",
        "Forest",
        "Underground",
        "Kitchen",
        "Interior",
        "Hospital",
        "Outdoor",
        "Farm",
        "Cave",
        "Underwater",
        "Furniture",
        "Electronic",
        "Construction",
        "Food",
        "Sports",
        "Medical",

    ];


    return (


        <>
            <h1>AssetAction</h1>
            <div className="container form-container-assets">
                <Form
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                    initialValues={{
                        // priority: 3,
                        // assettype: "Prop",
                        // project: "Internal",
                        // specialnotes: "-"

                    }}
                >
                    <div className=''>
                        <Form.Item label="Asset Name" name="assetName" hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter a recognizable name for the asset',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                </Form>

            </div>
        </>

    );
}