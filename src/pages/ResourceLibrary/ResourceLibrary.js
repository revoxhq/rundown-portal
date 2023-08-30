import { useEffect, useState } from 'react';
import { db } from "../../config/firebase";
import { getDocs, collection } from 'firebase/firestore'
import { Button, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Link',
        dataIndex: 'link',
        key: 'link',
        render: (text) => <a href={text}>{text}</a>,
    }
];

export const ResourceLibrary = () => {

    const [resourceList, setResourceList] = useState([]);
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
                setResourceList(filteredRefData);
                // console.log(filteredRefData);
            }
            catch (err) {
                console.error(err)
            }
        }

        getRefList();
    })

    return (
        <div className="resources">
            <h1>Resource</h1>
            <Link to="/resources/add" >
                <Button icon={<SearchOutlined />}>Add New Resource</Button>
            </Link>

            <Table rowKey={resourceList.key} columns={columns} dataSource={resourceList} pagination={false} />
        </div>
    );
}