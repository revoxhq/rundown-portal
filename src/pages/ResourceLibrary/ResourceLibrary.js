import { useEffect, useState } from 'react';
import { db } from "../../config/firebase";
import { getDocs, collection } from 'firebase/firestore'
import { Button, Card, Input, List, Col, Row } from 'antd';
import { SearchOutlined, ReadOutlined, EditOutlined, PartitionOutlined, AudioOutlined, HighlightOutlined, FolderOpenOutlined, BarChartOutlined, CoffeeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Search } = Input;



export const ResourceLibrary = () => {
    const [documentation_data, setDocuments] = useState([]);
    const [worksheet_data, setWorksheet] = useState([]);
    const [moodboard_data, setMoodboard] = useState([]);
    const [artwork_data, setArtwork] = useState([]);
    const [audio_data, setAudio] = useState([]);
    const [folder_data, setFolder] = useState([]);
    const [other_data, setOthers] = useState([]);

    // const [resourceList, setResourceList] = useState([]);
    const resourceListRef = collection(db, "reference-resources");
    useEffect(() => {
        const getRefList = async () => {
            try {
                const data = await getDocs(resourceListRef);
                const filteredRefData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                    key: doc.id
                }))
                filterData(filteredRefData);
            }
            catch (err) {
                console.error(err)
            }
        }

        getRefList();
    }, []);

    const filterData = (filteredData) => {
        setDocuments([]);
        setWorksheet([]);
        setMoodboard([]);
        setArtwork([]);
        setAudio([]);
        setFolder([]);
        setOthers([]);


        filteredData.forEach(data => {
            switch (data.type) {
                case "Documentation":
                    if (documentation_data.length < 10)
                        setDocuments(documentation_data => [...documentation_data, data]);
                    break;
                case "Worksheet":
                    if (worksheet_data.length < 10)
                        setWorksheet(worksheet_data => [...worksheet_data, data]);
                    break;
                case "Moodboard":
                    if (moodboard_data.length < 10)
                        setMoodboard(moodboard_data => [...moodboard_data, data]);
                    break;
                case "Artwork":
                    if (artwork_data.length < 10)
                        setArtwork(artwork_data => [...artwork_data, data]);
                    break;
                case "Audio":
                    if (audio_data.length < 10)
                        setAudio(audio_data => [...audio_data, data]);
                    break;
                case "Folder":
                    if (folder_data.length < 10)
                        setFolder(folder_data => [...folder_data, data]);
                    break;
                default:
                    if (other_data.length < 10)
                        setOthers(other_data => [...other_data, data]);
                    break;
            }
        });
    }

    return (
        <div className="resources">
            <h1>Resource</h1>
            <Link to="/resources/add" >
                <Button icon={<SearchOutlined />}>Add New Resource</Button>
            </Link>

            <Search placeholder="Input search text" enterButton="Search" size="large" style={{ width: 800 }} />


            <Row gutter={[16, 24]} className='justify-center m-t-50'>

                <Col className="gutter-row" span={5}>
                    {/* Documentation */}
                    <Card className='resource-card' title="Documentation" extra={<a href="#">More</a>} style={{ width: 300 }} hoverable={true}>
                        <List
                            itemLayout="horizontal"
                            dataSource={documentation_data}
                            renderItem={(item, index) => (
                                <List.Item style={{ textAlign: 'left' }}>
                                    <List.Item.Meta
                                        avatar={<ReadOutlined />}
                                        title={<div className='d-flex justify-space-between'><a href={item.link} target="_blank" rel="noreferrer">{item.name}</a><a href={item.link}><EditOutlined /></a></div>}
                                        description={<p>{item.project} - {item.description}</p>}
                                        listkey={item.name}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                <Col className="gutter-row" span={5}>
                    {/* Moodboard */}
                    <Card className='resource-card' title="Moodboards" extra={<a href="#">More</a>} style={{ width: 300 }} hoverable={true}>
                        <List
                            itemLayout="horizontal"
                            dataSource={moodboard_data}
                            renderItem={(item, index) => (
                                <List.Item style={{ textAlign: 'left' }}>
                                    <List.Item.Meta
                                        avatar={<PartitionOutlined />}
                                        title={<div className='d-flex justify-space-between'><a href={item.link} target="_blank" rel="noreferrer">{item.name}</a><a href={item.link}><EditOutlined /></a></div>}
                                        description={<p>{item.project} - {item.description}</p>}
                                        listkey={item.name}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                <Col className="gutter-row" span={5}>
                    {/* Audio */}
                    <Card title="Audio" extra={<a href="#">More</a>} style={{ width: 300 }} hoverable={true}>
                        <List
                            itemLayout="horizontal"
                            dataSource={audio_data}
                            renderItem={(item, index) => (
                                <List.Item style={{ textAlign: 'left' }}>
                                    <List.Item.Meta
                                        avatar={<AudioOutlined />}
                                        title={<div className='d-flex justify-space-between'><a href={item.link} target="_blank" rel="noreferrer">{item.name}</a><a href={item.link}><EditOutlined /></a></div>}
                                        description={<p>{item.project} - {item.description}</p>}
                                        listkey={item.name}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                <Col className="gutter-row" span={5}>
                    {/* Artwork */}
                    <Card title="Artwork" extra={<a href="#">More</a>} style={{ width: 300 }} hoverable={true}>
                        <List
                            itemLayout="horizontal"
                            dataSource={artwork_data}
                            renderItem={(item, index) => (
                                <List.Item style={{ textAlign: 'left' }}>
                                    <List.Item.Meta
                                        avatar={<HighlightOutlined />}
                                        title={<div className='d-flex justify-space-between'><a href={item.link} target="_blank" rel="noreferrer">{item.name}</a><a href={item.link}><EditOutlined /></a></div>}
                                        description={<p>{item.project} - {item.description}</p>}
                                        listkey={item.name}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                <Col className="gutter-row" span={5}>
                    {/* Folder */}
                    <Card title="Folders" extra={<a href="#">More</a>} style={{ width: 300 }} hoverable={true}>
                        <List
                            itemLayout="horizontal"
                            dataSource={folder_data}
                            renderItem={(item, index) => (
                                <List.Item style={{ textAlign: 'left' }}>
                                    <List.Item.Meta
                                        avatar={<FolderOpenOutlined />}
                                        title={<div className='d-flex justify-space-between'><a href={item.link} target="_blank" rel="noreferrer">{item.name}</a><a href={item.link}><EditOutlined /></a></div>}
                                        description={<p>{item.project} - {item.description}</p>}
                                        listkey={item.name}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                <Col className="gutter-row" span={5}>
                    {/* Worksheet */}
                    <Card title="Worksheet" extra={<a href="#">More</a>} style={{ width: 300 }} hoverable={true}>
                        <List
                            itemLayout="horizontal"
                            dataSource={worksheet_data}
                            renderItem={(item, index) => (
                                <List.Item style={{ textAlign: 'left' }}>
                                    <List.Item.Meta
                                        avatar={<BarChartOutlined />}
                                        title={<div className='d-flex justify-space-between'><a href={item.link} target="_blank" rel="noreferrer">{item.name}</a><a href={item.link}><EditOutlined /></a></div>}
                                        description={<p>{item.project} - {item.description}</p>}
                                        listkey={item.name}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                <Col className="gutter-row" span={5}>
                    {/* Other */}
                    <Card title="Other" extra={<a href="#">More</a>} style={{ width: 300 }} hoverable={true}>
                        <List
                            itemLayout="horizontal"
                            dataSource={other_data}
                            renderItem={(item, index) => (
                                <List.Item style={{ textAlign: 'left' }}>
                                    <List.Item.Meta
                                        avatar={<CoffeeOutlined />}
                                        title={<div className='d-flex justify-space-between'><a href={item.link} target="_blank" rel="noreferrer">{item.name}</a><a href={item.link}><EditOutlined /></a></div>}
                                        description={<p>{item.project} - {item.description}</p>}
                                        listkey={item.name}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}