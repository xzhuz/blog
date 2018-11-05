import React from 'react';
import {Helmet} from 'react-helmet';
import { CSSTransition } from 'react-transition-group';
import * as FontAwesome from 'react-icons/lib/fa';

import Info from "../../components/Info/index";
import './stylesheets/about.scss';

class About extends React.PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            showAbout: false,
        };
    }

    componentDidMount() {
        this.setState({showAbout: true});
    }

    componentWillUnmount() {
        this.setState({showAbout: false});
    }

    render() {
        const github = <a href='https://github.com/xebcxc' target='_blank'>xebcxc</a>;
        const weiBo = <a href='https://weibo.com/u/3002849234?refer_flag=1001030101_' target='_blank'>小二不吃香菜</a>;
        return (
            <CSSTransition
                in={this.state.showAbout}
                classNames="about"
                unmountOnExit
                timeout={{ enter: 500, exit: 300 }}
                onExited={() => {this.setState({showAbout: false});}}
            >
                <div className='container'>
                    <Helmet title='梅 森 | 关于'/>
                    <div className={'about-content'}>
                        <div className={'about-info'}>
                            <section className='about-info-about'>
                                <h2><span className='title'>Abo</span>ut</h2>
                                <p>大家好👋️, 我叫梅森, 来自重庆的Java工程师👨🏼‍💻</p>
                                <p>我希望用代码改变世界🤭😬,我也在改变世界,自豪脸😏</p>
                                <p>目前正走在成为一个牛逼(Zhuang Bi)程序猿的路上. 前途很艰辛, 但是我会坚持!</p>
                                <p>最后, 生活不止有撸码和工作, 也有诗和远方😏. 在快乐中生活, 在快乐中工作, 爱家人, 爱自己🤗</p>
                                <p><i className='quote-name'>子曰：</i><i className='quote-content'>“生而知之者，上也；学而知之者，次也；困而学之，又其次也；困而不学，民斯为下矣。” </i></p>
                            </section>
                            <section className='about-info-blog'>
                                <h2><span className='title'>Blo</span>g</h2>
                                <p>期望：平时生活和工作一种记录🖋, 希望之后回过头再来看自己的博客也会有所收获或感想</p>
                                <p>自己一些杂谈📽(不是一个纯粹的技术博客🤫)</p>
                                <p>对自己生活的记录</p>
                                <p>希望自己越来越强大，越来越开心🚀🚀</p>
                                <p>同时, 也是对于自己生活工作的一个记录😋</p>
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
                </div>
            </CSSTransition>
        );
    }
}


export default About;