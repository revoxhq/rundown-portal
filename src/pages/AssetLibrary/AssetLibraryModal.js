import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form, Input, Slider, Select, Typography, Progress, Radio, Space, Tag, Steps } from 'antd';
import { addDoc, collection } from 'firebase/firestore';
import { db } from "../../config/firebase";
import { PlusCircleOutlined, CheckOutlined, UserOutlined, MehOutlined, CloseCircleOutlined } from '@ant-design/icons';

export const AssetLibraryModal = () => {

    const [pipelineAssignees, setPipelineAssignees] = useState({
        "writing": 'nan',
        "conceptArt": 'nan',
        "lowPoly3D": 'nan',
        "highPoly3D": 'nan',
        "UVMap": 'nan',
        "texture": 'nan',
        "finalization": 'nan',
        "complete": 'nan'
    });
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [priorityLevel, setPriorityLevel] = useState('Priority: Moderate');
    const { Text, Link } = Typography;
    const { Option } = Select;
    const { Title } = Typography;
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const [currentStep, setCurrentProgress] = useState(0);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const { CheckableTag } = Tag;

    const tagsData = ["Architecture",
        "Sci-Fi",
        "Realistic",
        "Cartoon",
        "Fantasy",
        "Steampunk",
        "Cyberpunk",
        "Minimalist",
        "Retro",
        "Gothic",
        "Medical",
        "Horror",
        "Adventure",
        "Sports",
        "Medieval",
        "Victorian",
        "Metal",
        "Wood",
        "Stone",
        "Glass",
        "Plastic",
        "Organic",
        "Fabric",
        "Ceramics",
        "Underwater",
        "Forest",
        "Arctic",
        "Tropical",
        "Mountainous"];
    //------------------------
    const resourceListRef = collection(db, "inhouse-assets");

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
                'assetName': values.assetName,
                'description': values.description,
                'project': values.project,
                'assettype': values.assettype,
                'folderUrl': values.assetUrl,
                'conceptArtUrl': values.cocneptUrl,
                'priority': values.priority,
                'dateUpdated': Date.now(),
                'pipeline': JSON.stringify(pipelineAssignees),
                'tags': selectedTags,
                'specialNotes': values.specialnotes,
            })
        } catch (err) {
            console.error(err)
        }
    }





    const onChangePriority = (value) => {
        switch (value) {
            case 1:
                setPriorityLevel("Priority: Very Low");
                break;
            case 2:
                setPriorityLevel("Priority: Low");
                break;
            case 3:
                setPriorityLevel("Priority: Moderate");
                break;
            case 4:
                setPriorityLevel("Priority: High");
                break;
            case 5:
                setPriorityLevel("Priority: Urgent");
                break;
            default:
                setPriorityLevel("Priority: Moderate");
                break;
        }
    };


    //---------------------


    const onAssigned = (index, keyValue, value) => {
        console.log(keyValue);
        if (index < currentStep)
            return;
        setCurrentProgress(index);

        const updatedMapData = { ...pipelineAssignees };
        updatedMapData[keyValue] = value;

        setPipelineAssignees(updatedMapData);
        // console.log(pipelineAssignees);
    };

    //--------------

    const onDescriptionorSpecialNotesAdd = (e) => {
        // console.log('Change:', e.target.value);
    };


    //----------------------
    const [selectedTags, setSelectedTags] = useState([]);
    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
    };


    return (
        <div className="asset-library">
            <Button type="primary" onClick={showModal}>
                Open Modal with async logic
            </Button>
            <Modal
                title=""
                open={open}
                width={1080}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                className='create-asset-modal'
                footer={<div className='button-wrapper'>

                    <div className='inner'>
                        <Button type="link" htmlType="button" >
                            Cancel
                        </Button>

                        <div className='confirm-btns'>
                            <Button htmlType="button" onClick={handleOk} className='m-r-10'>
                                Add Another <PlusCircleOutlined />
                            </Button>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" onClick={() => {
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
                                    Submit <CheckOutlined />
                                </Button>
                            </Form.Item>

                        </div>
                    </div>
                </div>}
            >

                <div className="form-container-assets">
                    <Form
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout='vertical'
                        initialValues={{
                            priority: 3,
                            assettype: "Prop",
                            project: "Internal",
                        }}
                    >
                        <div className='modal-inner'>
                            <div className='modal-left'>
                                <Text type="secondary m-b-15">Add a new Asset</Text>

                                {/* Asset Name */}
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

                                {/* Asset Description */}
                                <Form.Item name={'description'} label="Description">
                                    <TextArea showCount maxLength={100} onChange={onDescriptionorSpecialNotesAdd} />
                                </Form.Item>

                                {/* ====================In House Items ======================== */}
                                <Form.Item
                                    name="project"
                                    label="Project"
                                >
                                    <Select placeholder="Select a project" defaultValue={'Internal'}>
                                        <Option value="Internal">Internal</Option>
                                        <Option value="Spiral">Spiral</Option>
                                        <Option value="Starwalker">Starwalker</Option>
                                        <Option value="Goodnessgame">Goodness Game</Option>
                                        <Option value="Other">Other</Option>
                                    </Select>
                                </Form.Item>


                                <Form.Item
                                    name="assettype"
                                    label="Asset Type"
                                >
                                    <Select placeholder="Select Asset Type" defaultValue={'Prop'}>
                                        <Option value="prop">Prop</Option>
                                        <Option value="Electronic">Electronic</Option>
                                        <Option value="Vehicle">Vehicle</Option>
                                        <Option value="Character">Character</Option>
                                        <Option value="Weapon">Weapon</Option>
                                        <Option value="Furniture">Furniture</Option>
                                        <Option value="Foliage">Foliage</Option>
                                        <Option value="Environment">Environment</Option>
                                        <Option value="Clothing">Clothing</Option>
                                        <Option value="Other">Other</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="cocneptUrl"
                                    label="Concept Art URL"
                                    rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
                                >
                                    <Input addonBefore="G-Drive Link" placeholder="Concept Art URL" />
                                </Form.Item>


                                <Form.Item
                                    name="assetUrl"
                                    label="Asset Folder URL"
                                    rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
                                // style={{ marginTop: "30px" }}
                                >
                                    <Input addonBefore="OneDrive Link" placeholder="Asset Folder URL (Ensure all asset items are in one folder)" />
                                </Form.Item>


                                <Form.Item name="priority" label={priorityLevel} style={{ marginBottom: "20px" }}>
                                    <Slider max={5} min={1} defaultValue={3} onChange={onChangePriority} initialValues={3}
                                        marks={{
                                            1: '1',
                                            2: '2',
                                            3: '3',
                                            4: '4',
                                            5: '5',
                                        }}
                                    />
                                </Form.Item>



                                {/* //-------------------Tags---------------------- */}
                                <Text className="m-b-10">Choose Tags</Text>

                                <div className='tags-wrapper'>
                                    <Space size={[0, 8]} wrap>
                                        {tagsData.map((tag) => (
                                            <CheckableTag
                                                key={tag}
                                                checked={selectedTags.includes(tag)}
                                                onChange={(checked) => handleChange(tag, checked)}
                                            >
                                                {tag}
                                            </CheckableTag>
                                        ))}
                                    </Space>
                                </div>

                                {/* //-------------------Tags---------------------- */}





                            </div>
                            <div className='modal-right'>

                                <div className=''>
                                    <Title className='m-t-0 m-b-5' level={5}>Asset status and history</Title>
                                    <Text type="secondary m-b-15">Select an assignee to switch between steps</Text>
                                </div>

                                <Steps
                                    direction="vertical"
                                    size="small"
                                    current={currentStep}
                                    items={[
                                        {
                                            title: 'Writing',
                                            description: (
                                                <div className='steps-assignee-wrapper'>
                                                    <Text type="secondary">Writing has completed</Text>
                                                    <Select placeholder="Select Assignee" defaultValue={'NotAssigned'} bordered={false} onChange={value => onAssigned(1, 'writing', value)}>
                                                        <Option value="NotAssigned"><MehOutlined /> Not Assigned</Option>
                                                        <Option value="Buddhika"><UserOutlined /> Buddhika</Option>
                                                        <Option value="Chalaka"><UserOutlined /> Chalaka</Option>
                                                        <Option value="Hansaka"><UserOutlined /> Hansaka</Option>
                                                        <Option value="Imarah"><UserOutlined /> Imarah</Option>
                                                        <Option value="John"><UserOutlined /> John</Option>
                                                        <Option value="Thisara"><UserOutlined /> Thisara</Option>
                                                        <Option value="Zikra"><UserOutlined /> Zikra</Option>
                                                        <Option value="Other"><UserOutlined /> Other</Option>
                                                    </Select>
                                                </div>
                                            ),
                                        },
                                        {
                                            title: 'Concept Art',
                                            description: (
                                                <div className='steps-assignee-wrapper'>
                                                    <Text type="secondary">Concept Art drawn</Text>
                                                    <Select placeholder="Select Assignee" defaultValue={'NotAssigned'} bordered={false} onChange={value => onAssigned(2, 'conceptArt', value)}>
                                                        <Option value="NotAssigned"><MehOutlined /> Not Assigned</Option>
                                                        <Option value="Buddhika"><UserOutlined /> Buddhika</Option>
                                                        <Option value="Chalaka"><UserOutlined /> Chalaka</Option>
                                                        <Option value="Hansaka"><UserOutlined /> Hansaka</Option>
                                                        <Option value="Imarah"><UserOutlined /> Imarah</Option>
                                                        <Option value="John"><UserOutlined /> John</Option>
                                                        <Option value="Thisara"><UserOutlined /> Thisara</Option>
                                                        <Option value="Zikra"><UserOutlined /> Zikra</Option>
                                                        <Option value="Other"><UserOutlined /> Other</Option>
                                                    </Select>
                                                </div>
                                            ),
                                        },
                                        {
                                            title: 'Rough 3D',
                                            description: (
                                                <div className='steps-assignee-wrapper'>
                                                    <Text type="secondary">Low poly 3D model</Text>
                                                    <Select placeholder="Select Assignee" defaultValue={'NotAssigned'} bordered={false} onChange={value => onAssigned(3, 'lowPoly3D', value)}>
                                                        <Option value="NotAssigned"><MehOutlined /> Not Assigned</Option>
                                                        <Option value="Buddhika"><UserOutlined /> Buddhika</Option>
                                                        <Option value="Chalaka"><UserOutlined /> Chalaka</Option>
                                                        <Option value="Hansaka"><UserOutlined /> Hansaka</Option>
                                                        <Option value="Imarah"><UserOutlined /> Imarah</Option>
                                                        <Option value="John"><UserOutlined /> John</Option>
                                                        <Option value="Thisara"><UserOutlined /> Thisara</Option>
                                                        <Option value="Zikra"><UserOutlined /> Zikra</Option>
                                                        <Option value="Other"><UserOutlined /> Other</Option>
                                                    </Select>
                                                </div>
                                            ),
                                        },
                                        {
                                            title: 'Detailed 3D',
                                            description: (
                                                <div className='steps-assignee-wrapper'>
                                                    <Text type="secondary">A higher 3D Model</Text>
                                                    <Select placeholder="Select Assignee" defaultValue={'NotAssigned'} bordered={false} onChange={value => onAssigned(4, 'highPoly3D', value)}>
                                                        <Option value="NotAssigned"><MehOutlined /> Not Assigned</Option>
                                                        <Option value="Buddhika"><UserOutlined /> Buddhika</Option>
                                                        <Option value="Chalaka"><UserOutlined /> Chalaka</Option>
                                                        <Option value="Hansaka"><UserOutlined /> Hansaka</Option>
                                                        <Option value="Imarah"><UserOutlined /> Imarah</Option>
                                                        <Option value="John"><UserOutlined /> John</Option>
                                                        <Option value="Thisara"><UserOutlined /> Thisara</Option>
                                                        <Option value="Zikra"><UserOutlined /> Zikra</Option>
                                                        <Option value="Other"><UserOutlined /> Other</Option>
                                                    </Select>
                                                </div>
                                            ),
                                        },
                                        {
                                            title: 'UV Map',
                                            description: (
                                                <div className='steps-assignee-wrapper'>
                                                    <Text type="secondary">UV Mapping Complete</Text>
                                                    <Select placeholder="Select Assignee" defaultValue={'NotAssigned'} bordered={false} onChange={value => onAssigned(5, 'UVMap', value)}>
                                                        <Option value="NotAssigned"><MehOutlined /> Not Assigned</Option>
                                                        <Option value="Buddhika"><UserOutlined /> Buddhika</Option>
                                                        <Option value="Chalaka"><UserOutlined /> Chalaka</Option>
                                                        <Option value="Hansaka"><UserOutlined /> Hansaka</Option>
                                                        <Option value="Imarah"><UserOutlined /> Imarah</Option>
                                                        <Option value="John"><UserOutlined /> John</Option>
                                                        <Option value="Thisara"><UserOutlined /> Thisara</Option>
                                                        <Option value="Zikra"><UserOutlined /> Zikra</Option>
                                                        <Option value="Other"><UserOutlined /> Other</Option>
                                                    </Select>
                                                </div>
                                            ),
                                        },
                                        {
                                            title: 'Texture',
                                            description: (
                                                <div className='steps-assignee-wrapper'>
                                                    <Text type="secondary">Textured</Text>
                                                    <Select placeholder="Select Assignee" defaultValue={'NotAssigned'} bordered={false} onChange={value => onAssigned(6, 'texture', value)}>
                                                        <Option value="NotAssigned"><MehOutlined /> Not Assigned</Option>
                                                        <Option value="Buddhika"><UserOutlined /> Buddhika</Option>
                                                        <Option value="Chalaka"><UserOutlined /> Chalaka</Option>
                                                        <Option value="Hansaka"><UserOutlined /> Hansaka</Option>
                                                        <Option value="Imarah"><UserOutlined /> Imarah</Option>
                                                        <Option value="John"><UserOutlined /> John</Option>
                                                        <Option value="Thisara"><UserOutlined /> Thisara</Option>
                                                        <Option value="Zikra"><UserOutlined /> Zikra</Option>
                                                        <Option value="Other"><UserOutlined /> Other</Option>
                                                    </Select>
                                                </div>
                                            ),
                                        },
                                        {
                                            title: 'Finalization',
                                            description: (
                                                <div className='steps-assignee-wrapper'>
                                                    <Text type="secondary">Final Touches</Text>
                                                    <Select placeholder="Select Assignee" defaultValue={'NotAssigned'} bordered={false} onChange={value => onAssigned(7, 'finalization', value)}>
                                                        <Option value="NotAssigned"><MehOutlined /> Not Assigned</Option>
                                                        <Option value="Buddhika"><UserOutlined /> Buddhika</Option>
                                                        <Option value="Chalaka"><UserOutlined /> Chalaka</Option>
                                                        <Option value="Hansaka"><UserOutlined /> Hansaka</Option>
                                                        <Option value="Imarah"><UserOutlined /> Imarah</Option>
                                                        <Option value="John"><UserOutlined /> John</Option>
                                                        <Option value="Thisara"><UserOutlined /> Thisara</Option>
                                                        <Option value="Zikra"><UserOutlined /> Zikra</Option>
                                                        <Option value="Other"><UserOutlined /> Other</Option>
                                                    </Select>
                                                </div>
                                            ),
                                        },
                                        {
                                            title: 'Complete',
                                            description: (
                                                <div className='steps-assignee-wrapper'>
                                                    <Text type="secondary">Green Lit</Text>
                                                    <Select placeholder="Select Assignee" defaultValue={'NotAssigned'} bordered={false} onChange={value => onAssigned(8, 'complete', value)}>
                                                        <Option value="NotAssigned"><MehOutlined /> Not Assigned</Option>
                                                        <Option value="Buddhika"><UserOutlined /> Buddhika</Option>
                                                        <Option value="Chalaka"><UserOutlined /> Chalaka</Option>
                                                        <Option value="Hansaka"><UserOutlined /> Hansaka</Option>
                                                        <Option value="Imarah"><UserOutlined /> Imarah</Option>
                                                        <Option value="John"><UserOutlined /> John</Option>
                                                        <Option value="Thisara"><UserOutlined /> Thisara</Option>
                                                        <Option value="Zikra"><UserOutlined /> Zikra</Option>
                                                        <Option value="Other"><UserOutlined /> Other</Option>
                                                    </Select>
                                                </div>
                                            ),
                                        },
                                    ]}


                                />

                                {/* Asset Description */}
                                <Form.Item name={'specialnotes'} label="Special Notes">
                                    <TextArea showCount maxLength={100} onChange={onDescriptionorSpecialNotesAdd} />
                                </Form.Item>

                            </div>
                        </div>
                    </Form>

                </div>
            </Modal>
        </div >

    );
}