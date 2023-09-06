import { useEffect, useState } from 'react';
import { db } from "../../config/firebase";
import { getDocs, collection } from 'firebase/firestore'
import { Button, Input, Col, Row, AutoComplete } from 'antd';
import { SearchOutlined, ReadOutlined, PartitionOutlined, AudioOutlined, HighlightOutlined, FolderOpenOutlined, BarChartOutlined, CoffeeOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ResourceCard } from './ResourceCard';

const { Search } = Input;



export const ResourceLibrary = () => {
    const [documentation_data, setDocuments] = useState([]);
    const [worksheet_data, setWorksheet] = useState([]);
    const [moodboard_data, setMoodboard] = useState([]);
    const [artwork_data, setArtwork] = useState([]);
    const [audio_data, setAudio] = useState([]);
    const [folder_data, setFolder] = useState([]);
    const [other_data, setOthers] = useState([]);
    const [search_data, setSearchData] = useState([]);
    const [allResourceData, setResourceData] = useState([]);

    const [searchOptions, setSearchOptions] = useState([]);

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
                setResourceData(filteredRefData);
            }
            catch (err) {
                console.error(err)
            }
        }

        getRefList();
    }, []);


    const renderTitle = (title) => (
        <span>
            {title}
            <a
                style={{
                    float: 'right',
                }}
                href="https://www.google.com/search?q=antd"
                target="_blank"
                rel="noopener noreferrer"
            >
                more
            </a>
        </span>
    );
    const renderItem = (title,link) => ({
        value: title,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <a href={link} target="_blank" rel="noreferrer">{title}</a>
                {/* {title} */}
            </div>
        ),
    });

    const optionsCopy = [
        {
            label: renderTitle('Documents'),
            options: [],
        },
        {
            label: renderTitle('Worksheet'),
            options: [],
        },
        {
            label: renderTitle('Moodboard'),
            options: [],
        },
        {
            label: renderTitle('Artwork'),
            options: [],
        },
        {
            label: renderTitle('Audio'),
            options: [],
        },
        {
            label: renderTitle('Folder'),
            options: [],
        },
        {
            label: renderTitle('Other'),
            options: [],
        },
    ];

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
                    if (documentation_data.length < 3)
                        setDocuments(documentation_data => [...documentation_data, data]);
                    break;
                case "Worksheet":
                    if (worksheet_data.length < 4)
                        setWorksheet(worksheet_data => [...worksheet_data, data]);
                    break;
                case "Moodboard":
                    if (moodboard_data.length < 4)
                        setMoodboard(moodboard_data => [...moodboard_data, data]);
                    break;
                case "Artwork":
                    if (artwork_data.length < 4)
                        setArtwork(artwork_data => [...artwork_data, data]);
                    break;
                case "Audio":
                    if (audio_data.length < 4)
                        setAudio(audio_data => [...audio_data, data]);
                    break;
                case "Folder":
                    if (folder_data.length < 4)
                        setFolder(folder_data => [...folder_data, data]);
                    break;
                default:
                    if (other_data.length < 4)
                        setOthers(other_data => [...other_data, data]);
                    break;
            }
        });

    }

    const onSearching = (e) => {
        setSearchData([]);
        allResourceData.forEach(data => {
            if ((data.name).toLowerCase().includes(e.toLowerCase())) {
                setSearchData(search_data => [...search_data, data]);
            }
            else if ((data.description).toLowerCase().includes(e.toLowerCase())) {
                setSearchData(search_data => [...search_data, data]);
            }
        });
        populateSearch(search_data);

    }
    const populateSearch = (searchdata) => {
        searchdata.forEach(data => {
            let index = 6;
            switch (data.type) {
                case "Documentation":
                    index = 0;
                    break;
                case "Worksheet":
                    index = 1;
                    break;
                case "Moodboard":
                    index = 2;
                    break;
                case "Artwork":
                    index = 3;
                    break;
                case "Audio":
                    index = 4;
                    break;
                case "Folder":
                    index = 5;
                    break;
                default:
                    index = 6;
                    break;
            }
            optionsCopy[index].options.push(renderItem(data.name, data.link));
        });
        setSearchOptions(optionsCopy);

    }

    return (
        <div className="resources">
            <h1>Resource</h1>
            <Link to="/resources/add" >
                <Button icon={<SearchOutlined />}>Add New Resource</Button>
            </Link>


            <AutoComplete
                popupClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                style={{
                    width: 800,
                }}
                options={searchOptions}
            >
                {/* <Input.Search size="large" placeholder="input here" /> */}
                <Search placeholder="Input search text" enterButton="Search" size="large" style={{ width: 800 }} onChange={e => onSearching(e.target.value)} />

            </AutoComplete>





            <Row gutter={[16, 24]} className='justify-center m-t-50'>

                <Col className="gutter-row" span={5}>
                    {/* Documentation */}
                    <ResourceCard titleName={"Documentation"} cardData={documentation_data} avatarIcon={<ReadOutlined />} />
                </Col>

                <Col className="gutter-row" span={5}>
                    {/* Moodboard */}
                    <ResourceCard titleName={"Moodboards"} cardData={moodboard_data} avatarIcon={<PartitionOutlined />} />

                </Col>

                <Col className="gutter-row" span={5}>
                    {/* Audio */}
                    <ResourceCard titleName={"Audio"} cardData={audio_data} avatarIcon={<AudioOutlined />} />


                </Col>

                <Col className="gutter-row" span={5}>
                    {/* Artwork */}
                    <ResourceCard titleName={"Artwork"} cardData={artwork_data} avatarIcon={<HighlightOutlined />} />

                </Col>

                <Col className="gutter-row" span={5}>
                    {/* Folder */}
                    <ResourceCard titleName={"Folders"} cardData={folder_data} avatarIcon={<FolderOpenOutlined />} />

                </Col>

                <Col className="gutter-row" span={5}>
                    {/* Worksheet */}
                    <ResourceCard titleName={"Worksheet"} cardData={worksheet_data} avatarIcon={<BarChartOutlined />} />

                </Col>

                <Col className="gutter-row" span={5}>
                    {/* Other */}
                    <ResourceCard titleName={"Other"} cardData={other_data} avatarIcon={<CoffeeOutlined />} />

                </Col>
            </Row>
        </div>
    );
}