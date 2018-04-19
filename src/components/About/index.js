import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as FontAwesome from 'react-icons/lib/fa';

import './about.scss';
import Info from "../Info";
import Interest from "../Interest";

class About extends React.PureComponent{

    render() {
        const avatar = require('../../img/avatar.jpg');
        const github = <a href='https://github.com/mrmeisen' target='_blank'>mrmeisen</a>;
        const weiBo = <a href='https://weibo.com/3002849234/profile?rightmod=1&wvr=6&mod=personinfo' target='_blank'>_MrMei</a>;
        return (
            <ReactCSSTransitionGroup
                component={'div'}
                className='container about-container'
                transitionName='about'
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
            >
                <div className={'about-content'}>
                    <div className={'avatar'}>
                        <img src={avatar}/>
                        <h1>Mei Sen</h1>
                        <h2>Java Developer</h2>
                    </div>
                    <div className={'about-info'}>
                        <section>
                            <h2><span className={'title'}>Bas</span>ic</h2>
                            <p>
                                <Info icon={<FontAwesome.FaUser/>} info={'梅森'}/>
                                <Info icon={<FontAwesome.FaUserMd/>} info={'Java开发工程师'}/>
                            </p>
                            <p>
                                <Info icon={<FontAwesome.FaLocationArrow/>} info={'重庆 Chong Qing'}/>
                                <Info icon={<FontAwesome.FaEnvelopeSquare/>} info={'ms915818993@163.com'}/>
                            </p>
                            <p>
                                <Info icon={<FontAwesome.FaGithub/>} info={github}/>
                                <Info icon={<FontAwesome.FaWeibo/>} info={weiBo}/>
                            </p>
                        </section>
                        <section>
                            <h2><span className={'title'}>Int</span>erests</h2>
                            <p>
                                <Interest label={'电影'} icon={'🎬'}/>
                                <Interest label={'音乐'} icon={'🎧'}/>
                                <Interest label={'小说'} icon={'📚'}/>
                                <Interest label={'茶'} icon={'🍵'}/>
                            </p>
                            <p>
                                <Interest label={'乒乓'} icon={'🏓'}/>
                                <Interest label={'Novel'} icon={'📚'}/>
                                <Interest label={'Music'} icon={'🎧'}/>
                                <Interest label={'Tea'} icon={'🍵'}/>
                            </p>
                        </section>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}


export default About;
