import { Card, Typography } from 'antd';
import { db, auth } from "../config/firebase";
import { Navigate } from 'react-router-dom';

const { Meta } = Card;
const { Title } = Typography;

export const Home = () => {

    const user = auth.currentUser;

    if (!user) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <>

            <div className='quicklink-cards-wrapper'>
                <Title>Welcome <span style={{ color: '#ff5a26'}}>{user.displayName}</span></Title>
                {/* <img alt="app" src='images/appLogos/rdportal.png' /> */}
                <div className='quicklink-cards-wrapper inner'>
                    {/* Clickup */}
                    <a href='https://app.clickup.com/5718642/v/l/s/55419830' target='_blank' className="quicklinks-card">
                        <Card hoverable className='home-card' style={{ width: 240, height: 240, }}
                            cover={<img alt="app" className='quicklink-img' src='images/appLogos/clickup.png' />}
                        >
                            <Meta title="Clickup" description="www.app.clickup.com" />
                        </Card>
                    </a>

                    {/* Clockify */}
                    <a href='https://app.clockify.me/dashboard' target='_blank' className="quicklinks-card">
                        <Card hoverable className='home-card' style={{ width: 240, height: 240, }}
                            cover={<img alt="app" className='quicklink-img' src='images/appLogos/clockify.png' />}
                        >
                            <Meta title="Clockify" description="www.app.clockify.me" />
                        </Card>
                </a>

                    {/* Discord */}
                    <a href='https://discord.com/channels/@me' target='_blank' className="quicklinks-card">
                        <Card hoverable className='home-card' style={{ width: 240, height: 240, }}
                            cover={<img alt="app" className='quicklink-img' src='images/appLogos/discord.png' />}
                        >
                            <Meta title="Discord" description="www.discord.com" />
                        </Card>
                    </a>


                    {/* Gather */}
                    <a href='https://app.gather.town/app/1xUDS07zQ1iNBBIS/revoxhq' target='_blank' className="quicklinks-card">
                        <Card hoverable className='home-card' style={{ width: 240, height: 240, }}
                            cover={<img alt="app" className='quicklink-img' src='images/appLogos/gather.png' />}
                        >
                            <Meta title="Gather" description="www.gather.town" />
                        </Card>
                    </a>


                    {/* Gmail */}
                    <a href='https://mail.google.com/mail/' target='_blank' className="quicklinks-card">
                        <Card hoverable className='home-card' style={{ width: 240, height: 240, }}
                            cover={<img alt="app" className='quicklink-img' src='images/appLogos/gmail.png' />}
                        >
                            <Meta title="Mail" description="www.mail.google.com" />
                        </Card>
                    </a>


                    {/* Slack */}
                    <a href='https://app.slack.com/client' target='_blank' className="quicklinks-card">
                        <Card hoverable className='home-card' style={{ width: 240, height: 240, }}
                            cover={<img alt="app" className='quicklink-img' src='images/appLogos/slack.png' />}
                        >
                            <Meta title="Slack" description="www.app.slack.com" />
                        </Card>
                    </a>


                    {/* Telegram */}
                    <a href='https://web.telegram.org/z/' target='_blank' className="quicklinks-card">
                        <Card hoverable className='home-card' style={{ width: 240, height: 240, }}
                            cover={<img alt="app" className='quicklink-img' src='images/appLogos/telegram.png' />}
                        >
                            <Meta title="Telegram" description="www.web.telegram.org" />
                        </Card>
                    </a>


                    {/* Youtube */}
                    <a href='https://www.youtube.com/' target='_blank' className="quicklinks-card">
                        <Card hoverable className='home-card' style={{ width: 240, height: 240, }}
                            cover={<img alt="app" className='quicklink-img' src='images/appLogos/youtube.png' />}
                        >
                            <Meta title="Youtube" description="www.youtube.com" />
                        </Card>
                    </a>

                </div>
            </div>



        </>

    );
}