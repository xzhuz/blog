import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as FontAwesome from 'react-icons/lib/fa';

import Info from "../Info";
import Interest from "../Interest";
import './about.scss';

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
                        <section className='about-info-about'>
                            <h2><span className='title'>Abo</span>ut</h2>
                            <p>大家好👋️, 我叫梅森, 来自重庆的Java程序猿⌨️</p>
                            <p>目前我正在用代码改变世界🤭😬,自豪脸😏</p>
                            <p>目前正走在成为一个很牛逼(ZhuangBi)的程序猿的道路上. 前途很艰辛, 但是我会坚持!</p>
                            <p>最后, 生活不止有撸码和工作, 也有诗和远方😏. 在快乐中生活, 在快乐中工作, 爱家人, 爱自己🤗</p>
                            <p><i className='quote-content'>“人生得意须尽欢, 莫使金樽空对月.” </i> <i className='quote-name'> - 李白</i></p>
                        </section>
                        <section className='about-info-blog'>
                            <h2><span className='title'>Blo</span>g</h2>
                            <p>对于平时学习和工作的一些知识积累的记录🖋</p>
                            <p>自己一些杂谈📽(不是一个纯粹的技术博客🤫)</p>
                            <p>同时, 也是对于自己生活工作的一个记录😋</p>
                            <p>技术驱动: 前端: React + Redux + React-Router 后端: Spring Boot + MySQL </p>
                            <p>PS. 由于博客才开始搭建, UI和功能都相对简单, 慢慢来...👐👐</p>
                        </section>
                        <section>
                            <h2><span className={'title'}>Con</span>tact</h2>
                            <p>
                                <Info icon={<FontAwesome.FaQq/>} info={'915818993'}/>
                                <Info icon={<FontAwesome.FaEnvelopeSquare/>} info={'ms915818993@163.com'}/>
                            </p>
                            <p>
                                <Info icon={<FontAwesome.FaGithub/>} info={github}/>
                                <Info icon={<FontAwesome.FaWeibo/>} info={weiBo}/>
                            </p>
                        </section>

                        <section className='about-info-statement'>
                            <h2><span className='title'>Sta</span>tement</h2>
                            <p>本站所有文章均为本人原创，仅代表个人当时意见和想法</p>
                            <p>内容转载请保留署名以及原文连接，谢谢😀</p>
                        </section>

                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}


export default About;
