import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form, Input, Slider, Select, Typography, Progress, Radio, Space, Tag, Steps } from 'antd';
import { addDoc, collection } from 'firebase/firestore';
import { db } from "../../config/firebase";
import { PlusCircleOutlined, CheckOutlined, UserOutlined, MehOutlined, PlusOutlined } from '@ant-design/icons';

export const AnimationAssetLibraryModal = ({ onAddResource }) => {

    const [pipelineAssignees, setPipelineAssignees] = useState({
        "Writing": 'nan',
        "Concept-Art": 'nan',
        "LowPoly-3D": 'nan',
        "HighPoly-3D": 'nan',
        "UV-Map": 'nan',
        "Texture": 'nan',
        "Finalization": 'nan',
        "Complete": 'nan'
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
    const [currentProgress, saveUpdatedProgress] = useState({});
    const [currentClient, setCurrentClient] = useState("Revox");



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
        "Medical"];
    //------------------------
    const resourceListRef = collection(db, "animation-assets ");

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
                'assetLink': values.assetUrl,
                'priority': values.priority,
                'dateUpdated': Date.now(),
                'pipeline': JSON.stringify(pipelineAssignees),
                'tags': selectedTags,
                'client': currentClient,
                'specialNotes': values.specialnotes,
                'currentProgress': currentProgress,
                "group": "Animation"
            })
            onAddResource();
            setOpen(false);
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
        saveUpdatedProgress(
            {
                'step': keyValue,
                'assignee': value
            }
        )
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
            <Button onClick={showModal}>
                <PlusOutlined /> Animation
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
                            {/* <Button htmlType="button" onClick={handleOk} className='m-r-10'>
                                Add Another <PlusCircleOutlined />
                            </Button> */}
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
                                    <Select placeholder="Select a project" defaultValue={'Internal'} onChange={onProjectChange}>
                                        <Option value="Internal">Internal</Option>
                                        <Option value="Spiral">Spiral</Option>
                                        <Option value="Starwalker">Starwalker</Option>
                                        <Option value="Goodnessgame">Goodness Game</Option>
                                        <Option value="Other">Other</Option>
                                    </Select>
                                </Form.Item>


                                <Form.Item
                                    name="assettype"
                                    label="Animation Type"
                                >
                                    <Select placeholder="Select Animation Type" defaultValue={'Prop'}>
                                        <Option value="prop">Prop</Option>
                                        <Option value="Vehicle">Vehicle</Option>
                                        <Option value="Character">Character</Option>
                                        <Option value="Weapon">Weapon</Option>
                                        <Option value="Foliage">Foliage</Option>
                                        <Option value="Other">Other</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="scriptUrl"
                                    label="Animation Script URL"
                                    rules={[{ type: 'string', min: 6 }]}
                                >
                                    <Input addonBefore="Script Link" placeholder="Script URL" />
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
                                                    <Select placeholder="Select Assignee" defaultValue={'NotAssigned'} bordered={false} onChange={value => onAssigned(1, 'Writing', value)}>
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
                                                    <Text type="secondary">Gathered references</Text>
                                                    <Select placeholder="Select Assignee" defaultValue={'NotAssigned'} bordered={false} onChange={value => onAssigned(2, 'Concept-Art', value)}>
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
                                                    <Text type="secondary">Block Animation</Text>
                                                    <Select placeholder="Select Assignee" defaultValue={'NotAssigned'} bordered={false} onChange={value => onAssigned(3, 'LowPoly-3D', value)}>
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
                                                    <Text type="secondary">Refined Animation</Text>
                                                    <Select placeholder="Select Assignee" defaultValue={'NotAssigned'} bordered={false} onChange={value => onAssigned(4, 'HighPoly-3D', value)}>
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
                                                    <Text type="secondary">Playtest</Text>
                                                    <Select placeholder="Select Assignee" defaultValue={'NotAssigned'} bordered={false} onChange={value => onAssigned(5, 'UV-Map', value)}>
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
                                                    <Text type="secondary">Finalized</Text>
                                                    <Select placeholder="Select Assignee" defaultValue={'NotAssigned'} bordered={false} onChange={value => onAssigned(6, 'Texture', value)}>
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
                                                    <Select placeholder="Select Assignee" defaultValue={'NotAssigned'} bordered={false} onChange={value => onAssigned(7, 'Finalization', value)}>
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
                                                    <Select placeholder="Select Assignee" defaultValue={'NotAssigned'} bordered={false} onChange={value => onAssigned(8, 'Complete', value)}>
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