import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Space, Table, Progress, AutoComplete, Input } from 'antd';
import { red, green, yellow, blue, orange } from '@ant-design/colors';
import { Link } from 'react-router-dom';

const { Search } = Input;

export const SepeceficResourceLibrary = () => {

    const location = useLocation();
    const [resouce_data, setResourceData] = useState([]);
    const [search_data, setSearchData] = useState([]);

    useEffect(() => {
        setResourceData(location.state.cardData);
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <a target="_blank" href={record.link}>{record.name}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
        },
        {
            title: 'Access-level',
            key: 'access-level',
            dataIndex: 'access-level',
            render: (_, record) => (
                <Progress showInfo={false} percent={(record.accessLevel) * 20} steps={5} strokeColor={[blue[6], green[6], yellow[6], orange[5], red[5]]} />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to="/resources/type" >Edit</Link>
                    <Link to="/resources/type" >Delete</Link>
                </Space>
            ),
        }

    ];



    const onSearching = (e) => {
        setSearchData([]);
        location.state.cardData.forEach(data => {
            if ((data.name).toLowerCase().includes(e.toLowerCase())) {
                setSearchData(search_data => [...search_data, data]);
            }
            else if ((data.description).toLowerCase().includes(e.toLowerCase())) {
                setSearchData(search_data => [...search_data, data]);
            }
        });
        setResourceData(search_data);
    }

    return (

        // <div>{location.state.cardData[0].name}</div>
        <div className="container resources-detailed">
            {/* <AutoComplete
                popupClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                style={{
                    width: 800,
                }}
                options={search_data}
            >
                <Input.Search size="large" placeholder="input here" /> */}
            <Search className='m-b-50' placeholder="Input search text" enterButton="Search" size="large" style={{ width: 800 }} onChange={e => onSearching(e.target.value)} />

            {/* </AutoComplete> */}

            <Table columns={columns} dataSource={resouce_data} pagination={false} />
        </div>

    );
}