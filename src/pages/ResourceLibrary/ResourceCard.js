import { Card, List } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const ResourceCard = ({ titleName, cardData, avatarIcon }) => {
    return (

        <Card className='resource-card' title={titleName} extra={<Link to="/resources/type" state={{ cardData: cardData }}>More</Link> } style={{ width: 300 }} hoverable={true}>
            <List
                itemLayout="horizontal"
                dataSource={cardData}
                renderItem={(item, index) => (
                    <List.Item style={{ textAlign: 'left' }}>
                        <List.Item.Meta
                            avatar={avatarIcon}
                            title={<div className='d-flex justify-space-between'><a href={item.link} target="_blank" rel="noreferrer">{item.name}</a><a href={item.link}><EditOutlined /></a></div>}
                            description={<p>{item.project} - {item.description}</p>}
                            listkey={item.name}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
}