import { Button, Form, Input, Slider, Select, Typography, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { addDoc, collection } from 'firebase/firestore';
import { db } from "../../config/firebase";
import React, { useState } from 'react';
export const AddResource = ({ onAddResource }) => {

    const resourceListRef = collection(db, "reference-resources");

    const onFinish = (values) => {
        console.log('Success:', values);
        onSubmitForm(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onSubmitForm = async (values) => {
        try {
            await addDoc(resourceListRef, {
                'name': values.resourcename,
                'description': values.description,
                'type': values.resourceType,
                'link': values.url,
                'accessLevel': values.accesslevel,
                'project': values.project,
                'date-updated': Date.now()
            })
            onAddResource();
            setOpen(false);

        } catch (err) {
            console.error(err)
        }
    }

    const { Option } = Select;
    const { Title } = Typography;
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();


    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        onSubmitForm();
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Add Resource
            </Button>
            <Modal
                title="Add Resource"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={
                    <div className='button-wrapper'>
                        <Form.Item>
                            <Button className='m-l-10' type="primary" htmlType="submit" onClick={() => {
                                form
                                    .validateFields()
                                    .then((values) => {
                                        onFinish(values);
                                    })
                                    .catch((info) => {
                                        console.log("Validate Failed:", info);
                                    });
                            }}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </div>


                }
                okText='Add Resource'
            >
                <div className="resources">
                    {/* <Title level={1} style={{ marginBottom: "30px" }}>Add Resource</Title> */}
                    {/* <div className="form-container"> */}
                    <Form
                        labelCol={{
                            offset: 6,
                            span: 12,
                        }}
                        wrapperCol={{
                            offset: 6,
                            span: 12,
                        }}
                        style={{
                            minWidth: 800,
                            maxWidth: 800,
                            // justifyContent: 'center'
                        }}
                        initialValues={{
                            accesslevel: 3,
                            resourceType: "Documentation",
                            project: "Internal",
                        }}
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item label="Resource Name" name="resourcename" hasFeedback style={{ marginBottom: "30px" }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter a recognizable name for the resource',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item name={'description'} label="Description" style={{ marginBottom: "30px" }}>
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item name="accesslevel" label="Access Level" style={{ marginBottom: "50px" }}
                            help={"1: Anyone  |  2: Vistor  |  3: Team Member  |  4: Senior  |  5: Admin"}
                        >
                            <Slider max={5} min={1} defaultValue={3}
                                marks={{
                                    1: '1',
                                    2: '2',
                                    3: '3',
                                    4: '4',
                                    5: '5',
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="resourceType"
                            label="Select Resource Type"
                            style={{ marginBottom: "30px" }}
                        >
                            <Select placeholder="Select type of resource" defaultValue={'documentation'}>
                                <Option value="Documentation">Documentation</Option>
                                <Option value="Worksheet">Worksheet</Option>
                                <Option value="Moodboard">Moodboard</Option>
                                <Option value="Artwork">Artwork</Option>
                                <Option value="Audio">Audio</Option>
                                <Option value="Folder">Folder</Option>
                                <Option value="Other">Other</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="project"
                            label="Select Project"
                            style={{ marginBottom: "30px" }}
                        >
                            <Select placeholder="Select type of resource" defaultValue={'Internal'}>
                                <Option value="Internal">Internal</Option>
                                <Option value="Spiral">Spiral</Option>
                                <Option value="Starwalker">Starwalker</Option>
                                <Option value="Goodnessgame">Goodness Game</Option>
                                <Option value="Other">Other</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="url"
                            label="URL"
                            rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
                            style={{ marginBottom: "30px" }}
                        >
                            <Input placeholder="Resrouce URL (Ensure Access Level Matches Above)" />
                        </Form.Item>
                        {/* <Form.Item
                        >
                            <Button block type="primary" htmlType="submit">
                                    Submit
                                </Button>
                        </Form.Item> */}
                    </Form>
                    {/* </div> */}


                </div>
            </Modal>

        </>

    );
}