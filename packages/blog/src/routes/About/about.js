import React from 'react';
import {Helmet} from 'react-helmet';
import * as FontAwesome from 'react-icons/fa';

import BasicLayout from '../../components/BasicLayout';
import Info from "../../components/Info";
import './stylesheets/about.scss';

class About extends React.PureComponent{

    render() {
        const github = <a href='https://github.com/xebcxc' target='_blank'>xebcxc</a>;
        const zhiHu = <a href='https://www.zhihu.com/people/mei-sen-41-34/activities' target='_blank'>梅小森</a>;
        return (
            <BasicLayout>
                <Helmet title='梅 森 | 关于'/>
                <div className='about-container'>
                    <div className='about-info'>
                        <section className='about-info-about'>
                            <h2><span className='title'>Abo</span>ut</h2>
                            <ul>
                                <li>大家好，我是来自重庆的一枚会后端Java工程师👨🏼‍💻，目前在杭州.</li>
                                <li>我希望用代码改变世界🤭😬,我也在改变世界,自豪脸😏</li>
                                <li>目前正走在成为一个厉害(<s>Zhuang Bi</s>)程序猿的路上. 前途很艰辛, 但是我会坚持!</li>
                                <li>生活不止有撸码和工作, 也有诗和远方😏. 在快乐中生活, 在快乐中工作, 爱家人, 爱自己🤗</li>
                                <li><i className='quote-name'>子曰：</i><i className='quote-content'>“生而知之者，上也；学而知之者，次也；困而学之，又其次也；困而不学，民斯为下矣。” </i></li>
                                <li><i className='quote-name'>子曰：</i><i className='quote-content'>“申申如也,夭夭如也。” </i></li>
                            </ul>
                        </section>
                        <section className='about-info-skills'>
                            <h2><span className='title'>Ski</span>lls</h2>
                            <ul className='skills'>
                                <li>
                                    <span className='skills-title'>语言</span>
                                    <span className='skills-detail'>Java, JavaScript, HTML, CSS</span>
                                </li>
                                <li>
                                    <span className='skills-title'>数据库</span>
                                    <span className='skills-detail'>Oracle, MySQL, Redis</span>
                                </li>
                                <li>
                                    <span className='skills-title'>工具</span>
                                    <span className='skills-detail'>Maven, Tomcat, Nginx, MyBatis, Spring, Guice, Jersey, Shiro, Redux, JQuery, React, Spring Boot</span>
                                </li>
                                <li>
                                    <span className='skills-title'>环境</span>
                                    <span className='skills-detail'>Mac, Ubuntu, Linux, Git, Intellij IDEA</span>
                                </li>
                            </ul>
                        </section>
                        <section className='about-info-blog'>
                            <h2><span className='title'>Blo</span>g</h2>
                            <ul>
                                <li>期望：平时生活和工作一种记录🖋, 希望之后回过头再来看自己的博客也会有所收获或感想</li>
                                <li>自己一些杂谈📽(不是一个纯粹的技术博客🤫)</li>
                                <li>对生活的一个记录</li>
                                <li>希望自己越来越强大，越来越开心🚀🚀</li>
                                <li>也是对于自己生活工作的一个记录😋</li>
                            </ul>

                        </section>
                        <section>
                            <h2><span className='title'>Con</span>tact</h2>
                            <p>
                                <Info icon={<FontAwesome.FaQq/>} info={'915818993'}/>
                                <Info icon={<FontAwesome.FaEnvelopeSquare/>} info={'ms915818993@163.com'}/>
                            </p>
                            <p>
                                <Info icon={<FontAwesome.FaGithub/>} info={github}/>
                                <Info icon={<FontAwesome.FaZhihu/>} info={zhiHu}/>
                            </p>
                        </section>

                        <section className='about-info-statement'>
                            <h2><span className='title'>Sta</span>tement</h2>
                            <ul>
                                <li>本站所有文章为了记录工作、学习中遇到的问题，可能由于本人技术有限，有些不正确的地方，仅供参考</li>
                                <li>本站文章引用或转载写明来源，感谢原作者的辛苦写作，如果有异议或侵权，及时联系我处理，谢谢！</li>
                                <li>如他人引用本站中的文章或内容，请注明出处。但其文章或内容已不是本人原本的意思，请各位注意辨别！</li>
                                <li>本站所有文章仅代表个人当时意见和想法</li>
                                <li>欢迎指出有问题的地方，我会尽快修正，谢谢！</li>
                                <li>内容转载请保留署名以及原文连接，谢谢😀</li>
                            </ul>

                        </section>

                    </div>
                </div>
            </BasicLayout>
        );
    }
}


export default About;