import React, { useState } from 'react';
import { AssetLibraryModal } from "./AssetLibraryModal"
import { Typography, Tag, Button } from 'antd';
import { LinkOutlined, CheckCircleOutlined, DollarOutlined, ClockCircleOutlined, CloudDownloadOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

export const AssetLibrary = () => {
    return (
        <div className='container'>
            <AssetLibraryModal />

            <div className='asset-list-container'>
                <div className='asset-list-item'>
                    <div className='asset-icon-wrapper'>
                        {/* <ClockCircleOutlined style={{ fontSize: '75px' }} /> */}
                    </div>
                    <div className='asset-name-wrapper'>
                        <div className='asset-name-inner-wrapper'>
                            <a href='#'>
                                <Title level={5}>Flashlight </Title>
                            </a>
                            <a href='#'><LinkOutlined /></a>
                        </div>
                        <Text type="secondary">Electronic</Text>
                    </div>
                    <div className='asset-type-wrapper'>
                        <Title level={5}>3D Model</Title>
                        <div className='asset-type-inner-wrapper'>
                            <Text type="secondary">Complete <CheckCircleOutlined /></Text>
                            <Text type="secondary">Thisara </Text>
                        </div>
                    </div>
                    <div className='asset-project-wrapper'>
                        <Title level={5}>Starwalker</Title>
                        <Text type="secondary">Marius</Text>
                    </div>
                    <div className='asset-tags-wrapper'>
                        <Tag bordered={false} color="processing">
                            processing
                        </Tag>
                        <Tag bordered={false} color="success">
                            success
                        </Tag>
                    </div>
                    <div className='asset-actions-wrapper'>
                        <Button>View</Button>
                        <Button type="link">Edit</Button>
                    </div>
                </div>
                <div className='asset-list-item'>
                    <div className='asset-icon-wrapper'>
                        {/* <MessageOutlined style={{ fontSize: '75px' }} /> */}
                    </div>
                    <div className='asset-name-wrapper'>
                        <Title level={5}>Children Surgical Device</Title>
                        <Text type="secondary">Electronic</Text>
                    </div>
                    <div className='asset-type-wrapper'>
                        <Title level={5}>3D Model</Title>
                        <div className='asset-type-inner-wrapper'>
                            <Text type="secondary">Purchased <DollarOutlined /></Text>
                            <Text type="secondary">Epic Store </Text>
                        </div>
                    </div>
                    <div className='asset-project-wrapper'>
                        <Title level={5}>Spiral</Title>
                        <Text type="secondary">Revox</Text>
                    </div>
                    <div className='asset-tags-wrapper'>
                        <Tag bordered={false} color="processing">
                            processing
                        </Tag>
                        <Tag bordered={false} color="success">
                            success
                        </Tag>

                    </div>
                    <div className='asset-actions-wrapper'>
                        <Button>View</Button>
                        <Button type="link">Edit</Button>
                    </div>
                </div>
                <div className='asset-list-item'>
                    <div className='asset-icon-wrapper'>
                        {/* <ClockCircleOutlined style={{ fontSize: '75px' }} /> */}
                    </div>
                    <div className='asset-name-wrapper'>
                        <div className='asset-name-inner-wrapper'>
                            <a href='#'>
                                <Title level={5}>Flashlight </Title>
                            </a>
                            <a href='#'><LinkOutlined /></a>
                        </div>
                        <Text type="secondary">Electronic</Text>
                    </div>
                    <div className='asset-type-wrapper'>
                        <Title level={5}>3D Model</Title>
                        <div className='asset-type-inner-wrapper'>
                            <Text type="secondary">UV -Mapping <ClockCircleOutlined /></Text>
                            <Text type="secondary">Thisara </Text>
                        </div>
                    </div>
                    <div className='asset-project-wrapper'>
                        <Title level={5}>Starwalker</Title>
                        <Text type="secondary">Marius</Text>
                    </div>
                    <div className='asset-tags-wrapper'>
                        <Tag bordered={false} color="processing">
                            processing
                        </Tag>
                        <Tag bordered={false} color="success">
                            success
                        </Tag>
                    </div>
                    <div className='asset-actions-wrapper'>
                        <Button>View</Button>
                        <Button type="link">Edit</Button>
                    </div>
                </div>
                <div className='asset-list-item'>
                    <div className='asset-icon-wrapper'>
                        {/* <ClockCircleOutlined style={{ fontSize: '75px' }} /> */}
                    </div>
                    <div className='asset-name-wrapper'>
                        <div className='asset-name-inner-wrapper'>
                            <a href='#'>
                                <Title level={5}>Flashlight </Title>
                            </a>
                            <a href='#'><LinkOutlined /></a>
                        </div>
                        <Text type="secondary">Electronic</Text>
                    </div>
                    <div className='asset-type-wrapper'>
                        <Title level={5}>3D Model</Title>
                        <div className='asset-type-inner-wrapper'>
                            <Text type="secondary">Downloaded <CloudDownloadOutlined /></Text>
                            <Text type="secondary">One Drive </Text>
                        </div>
                    </div>
                    <div className='asset-project-wrapper'>
                        <Title level={5}>Starwalker</Title>
                        <Text type="secondary">Marius</Text>
                    </div>
                    <div className='asset-tags-wrapper'>
                        <Tag bordered={false} color="processing">
                            processing
                        </Tag>
                        <Tag bordered={false} color="success">
                            success
                        </Tag>
                    </div>
                    <div className='asset-actions-wrapper'>
                        <Button>View</Button>
                        <Button type="link">Edit</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}