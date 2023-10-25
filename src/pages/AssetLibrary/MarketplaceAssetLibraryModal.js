import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form, Input, Slider, Select, Typography, Empty, Radio, Space, Tag, Steps } from 'antd';
import { addDoc, collection } from 'firebase/firestore';
import { db } from "../../config/firebase";
import { PlusCircleOutlined, CheckOutlined, PlusOutlined} from '@ant-design/icons';

export const MarketplaceAssetLibraryModal = ({onAddResource}) => {

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const { Text, Link } = Typography;
    const { Option } = Select;
    const { Title } = Typography;
    const { TextArea } = Input;
    const [form] = Form.useForm();
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

    const options = [
        {
            label: 'Apple',
            value: 'Apple',
        },
        {
            label: 'Pear',
            value: 'Pear',
        },
        {
            label: 'Orange',
            value: 'Orange',
        },
    ];



    const resourceListRef = collection(db, "marketplace-assets");

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
                'assettype': values.assettype,
                'source': values.source,
                'assetLink': values.assetURL,
                'category': values.assetCategory,
                'dateUpdated': Date.now(),
                'tags': selectedTags,
                'specialNotes': values.specialnotes,
                "group": "Market"

            })
            onAddResource();
            setOpen(false);
        } catch (err) {
            console.error(err)
        }
    }





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
            <Button onClick={showModal}>
            <PlusOutlined /> Marketplace
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
                            source: "epic",
                            project: "Internal",
                            assetCategory:"3D Animation"
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
                                    name="source"
                                    label="Source"
                                >
                                    <Select placeholder="Select the Marketplace" defaultValue={'epic'}>
                                        <Option value="epic">Epic Store</Option>
                                        <Option value="unity">Unity Asset Store</Option>
                                        <Option value="itch">itch.io</Option>
                                        <Option value="cgtrader">CG Trader</Option>
                                        <Option value="downloaded">Downloaded (One Drive)</Option>
                                    </Select>
                                </Form.Item>


                                <Form.Item
                                    name="assetCategory"
                                    label="Category"
                                >
                                    <Select placeholder="Select the Category" defaultValue={'3D Animation'}>
                                        <Option value="3D Animation">3D Animation</Option>
                                        <Option value="3D Model">3D Model</Option>
                                        <Option value="2D Model">2D Model</Option>
                                        <Option value="Texture Pack">Texture Pack</Option>
                                        <Option value="Plugin">Plugin</Option>
                                        <Option value="BPComponent">BPComponent</Option>
                                        <Option value="Shaders">Shaders</Option>
                                        <Option value="VFX">VFX</Option>
                                        <Option value="Audio">Audio</Option>
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
                                    name="assetURL"
                                    label="Asset URL"
                                    rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
                                >
                                    <Input addonBefore="Asset Link" placeholder="Asset URL" />
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
                                    <Title className='m-t-0 m-b-5' level={5}>More Asset Actions</Title>
                                </div>

                                <Empty />

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