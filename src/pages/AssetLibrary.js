import { useEffect, useState } from 'react';
import { db } from "../config/firebase";
import { getDocs, collection } from 'firebase/firestore'
import { Table } from 'antd';


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

export const AssetLibrary = () => {
    const [resourceList, setResourceList] = useState([]);
    const resourceListRef = collection(db, "reference-resources")
    useEffect(() => {
        const getRefList = async () => {
            try {
                const data = await getDocs(resourceListRef);
                const filteredRefData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setResourceList(filteredRefData);
                // console.log(filteredRefData)
            }
            catch (err) {
                console.error(err)
            }
        }

        getRefList();
    })


    return (
        <div className="asset-library">
            <h1>Assets</h1>

            <Table columns={columns} dataSource={resourceList} pagination={false} />

        </div>

    );
}