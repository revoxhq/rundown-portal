import React, { useState, useEffect } from 'react';
import { AssetLibraryModal } from "./AssetLibraryModal"
import { MarketplaceAssetLibraryModal } from "./MarketplaceAssetLibraryModal"
import { AnimationAssetLibraryModal } from "./AnimationAssetLibraryModal"
import { Typography, Tag, Button, Input } from 'antd';
import { LinkOutlined, CheckCircleOutlined, DollarOutlined, HddOutlined } from '@ant-design/icons';
import { db, auth } from "../../config/firebase";
import { getDocs, collection } from 'firebase/firestore'
import { Navigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Search } = Input;


export const AssetLibrary = () => {
    const inhouseAssetList = collection(db, "inhouse-assets");
    const marketplaceAssetList = collection(db, "marketplace-assets");
    const animationAssetList = collection(db, "animation-assets ");
    const [allAssetData, setAssetData] = useState([]);
    const [assetSearchData, setSearchData] = useState([]);
    const user = auth.currentUser;


    const filterAllData = (allRefData) => {
        allRefData.forEach(list => {
            list.forEach(asset => {
                setAssetData(allAssetData => [...allAssetData, asset]);
                setSearchData(assetSearchData => [...assetSearchData, asset]);
            });
        });
    }


    useEffect(() => {
        const getRefList = async () => {
            try {
                const inhouseData = await getDocs(inhouseAssetList);
                let filteredRefData = [];
                filteredRefData.push(
                    inhouseData.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                        // key: doc.id
                    }))
                )
                const marketData = await getDocs(marketplaceAssetList);
                filteredRefData.push(
                    marketData.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                        // key: doc.id
                    }))
                )
                const animationData = await getDocs(animationAssetList);
                filteredRefData.push(
                    animationData.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                        // key: doc.id
                    }))
                )
                filterAllData(filteredRefData);
                console.log(filteredRefData);
            }
            catch (err) {
                console.error(err)
            }
        }

        getRefList();
    }, []);

    const mannualRerenderDetails = () => {
        const getRefList = async () => {
            try {
                const inhouseData = await getDocs(inhouseAssetList);
                let filteredRefData = [];
                filteredRefData.push(
                    inhouseData.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                        key: doc.id
                    }))
                )
                const marketData = await getDocs(marketplaceAssetList);
                filteredRefData.push(
                    marketData.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                        key: doc.id
                    }))
                )
                const animationData = await getDocs(animationAssetList);
                filteredRefData.push(
                    animationData.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                        key: doc.id
                    }))
                )
                filterAllData(filteredRefData);
                // console.log(filteredRefData);
            }
            catch (err) {
                console.error(err)
            }
        }

        getRefList();
    }

    if (!user) {
        return <Navigate to="/login" replace={true} />
    }



    const onSearching = (e) => {
        setSearchData([]);
        allAssetData.forEach(data => {
            if ((data.assetName).toLowerCase().includes(e.toLowerCase())) {
                setSearchData(assetSearchData => [...assetSearchData, data]);
            }
            else if ((data.assettype).toLowerCase().includes(e.toLowerCase())) {
                setSearchData(assetSearchData => [...assetSearchData, data]);
            }
            else {
                let hasTagMatch = false;
                data.tags.forEach(tags => {
                    if (tags.toLowerCase() == e.toLowerCase()) hasTagMatch = true;
                });
                if (hasTagMatch)
                    setSearchData(assetSearchData => [...assetSearchData, data]);
            }
        });
    }

    return (


        <div className='container'>
            <Title level={1} className='text-left'>Asset List </Title>

            <Search placeholder="Enter resource name or search by Tag" enterButton="Search" size="large" style={{ width: 800 }} onChange={e => onSearching(e.target.value)} />

            <div className='modal-button-wrapper'>
                <div className='modal-button-wrapper-inner'>
                    <AssetLibraryModal onAddResource={mannualRerenderDetails} />
                    <MarketplaceAssetLibraryModal onAddResource={mannualRerenderDetails} />
                    <AnimationAssetLibraryModal onAddResource={mannualRerenderDetails} />
                </div>
            </div>


            <div className='asset-list-container'>
                {assetSearchData.map((asset) => (
                    <>
                        {asset.group == "Market" ? (
                            <div key={asset.id} className='asset-list-item'>
                                <div className='asset-icon-wrapper'>
                                    {/* <MessageOutlined style={{ fontSize: '75px' }} /> */}
                                </div>
                                <div className='asset-name-wrapper'>
                                    <a href={asset.assetLink} target='_blank'>
                                        <Title level={5}>{asset.assetName} </Title>
                                    </a>
                                    <Text type="secondary">{asset.assettype}</Text>
                                </div>
                                <div className='asset-type-wrapper'>
                                    <Title level={5}>{asset.category}</Title>
                                    <div className='asset-type-inner-wrapper'>
                                        <Text type="secondary">Purchased <DollarOutlined /></Text>
                                        <Text type="secondary">{asset.source} </Text>
                                    </div>
                                </div>
                                <div className='asset-project-wrapper'>
                                    <Title level={5}>{asset.project}</Title>
                                    <Text type="secondary">{asset.client}</Text>
                                </div>
                                {/* <div className='asset-tags-wrapper'>
                                    {asset.tags.map((tag) => (
                                        <Tag key={tag} bordered={false} color="processing">
                                            {tag}
                                        </Tag>
                                    ))}
                                </div> */}
                                <div className='asset-actions-wrapper'>
                                    <Button>View</Button>
                                    <Button type="link">Edit</Button>
                                </div>
                            </div>
                        ) : asset.group == "Animation" ? (
                            <div key={asset.id} className='asset-list-item'>
                                <div className='asset-icon-wrapper'>
                                    {/* <ClockCircleOutlined style={{ fontSize: '75px' }} /> */}
                                </div>
                                <div className='asset-name-wrapper'>
                                    <div className='asset-name-inner-wrapper'>
                                        <a href='#'>
                                            <Title level={5}>{asset.assetName} </Title>
                                        </a>
                                        <a href='#'><LinkOutlined /></a>
                                    </div>
                                    <Text type="secondary">{asset.assettype}</Text>
                                </div>
                                <div className='asset-type-wrapper'>
                                    <Title level={5}>Animation</Title>
                                    <div className='asset-type-inner-wrapper'>
                                        <Text type="secondary">{asset.currentProgress.step} <CheckCircleOutlined /></Text>
                                        <Text type="secondary">{asset.currentProgress.assignee} </Text>

                                    </div>
                                </div>
                                <div className='asset-project-wrapper'>
                                    <Title level={5}>{asset.project}</Title>
                                    <Text type="secondary">{asset.client}</Text>
                                </div>
                                {/* <div className='asset-tags-wrapper'>
                                    {asset.tags.map((tag) => (
                                        <Tag key={tag} bordered={false} color="processing">
                                            {tag}
                                        </Tag>
                                    ))}
                                </div> */}
                                <div className='asset-actions-wrapper'>
                                    <Button>View</Button>
                                    <Button type="link">Edit</Button>
                                </div>
                            </div>
                        ) : (
                            <div key={asset.id} className='asset-list-item'>
                                <div className='asset-icon-wrapper'>
                                    {/* <ClockCircleOutlined style={{ fontSize: '75px' }} /> */}
                                </div>
                                <div className='asset-name-wrapper'>
                                    <div className='asset-name-inner-wrapper'>
                                        <a href={asset.assetLink} target='_blank'>
                                            <Title level={5}>{asset.assetName} </Title>
                                        </a>
                                        <a href={asset.conceptArtUrl} target='_blank'><LinkOutlined /></a>
                                    </div>
                                    <Text type="secondary">{asset.assettype}</Text>
                                </div>
                                <div className='asset-type-wrapper'>
                                    <Title level={5}>3D Model</Title>
                                    <div className='asset-type-inner-wrapper'>
                                        <Text type="secondary">{asset.currentProgress.step} <CheckCircleOutlined /></Text>
                                        <Text type="secondary">{asset.currentProgress.assignee} </Text>
                                    </div>
                                </div>
                                <div className='asset-project-wrapper'>
                                    <Title level={5}>{asset.project}</Title>
                                    <Text type="secondary">{asset.client}</Text>
                                </div>
                                {/* <div className='asset-tags-wrapper'>
                                    {asset.tags.map((tag) => (
                                        <Tag key={tag} bordered={false} color="processing">
                                            {tag}
                                        </Tag>
                                    ))}
                                </div> */}
                                <div className='asset-actions-wrapper'>
                                    <Button>View</Button>
                                    <Button type="link">Edit</Button>
                                </div>
                            </div>
                        )}
                    </>
                ))}
            </div>
        </div>
    );
}