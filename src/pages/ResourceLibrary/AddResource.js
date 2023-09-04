import { Button, Form, Input, Slider, Select, Typography } from 'antd';
import '../../styles/index.css'
import { addDoc, collection } from 'firebase/firestore';
import { db } from "../../config/firebase";

export const AddResource = () => {

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
                'access-level': values.accesslevel,
                'project': values.project,
                'date-updated': Date.now()
            })
        } catch (err) {
            console.error(err)
        }
    }

    const { Option } = Select;
    const { Title } = Typography;


    return (
        <div className="resources">
            <Title level={1} style={{ marginBottom: "30px" }}>Add Resource</Title>
            <div className="form-container">
                <Form
                    name="basic"
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
                    <Form.Item
                    >
                        <Button block type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>


        </div>
    );
}