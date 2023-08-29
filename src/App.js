import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { db } from "./config/firebase";
import { getDocs, collection } from 'firebase/firestore'
import { Space, Table, Tag } from 'antd';
import { NavBar } from './Navbar';


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

function App() {
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

  let Page;
  switch (window.location.pathname) {
    case "/":
      page = app;
      break;
    case "/Assets":
      page= <Assets/>
      break;
    case "/Documents":
      page= <Documents/>
      break;
  }

  return (
    <div className="App">
      <NavBar></NavBar>
      <Page></Page>
      <Auth></Auth>
      <Table columns={columns} dataSource={resourceList} pagination={false} />
    </div>
  );
}

export default App;
