import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Card from '../../components/Card/Card';
import {showPost} from "../../actions";
import './home.scss';
import SideBar from "../../components/SideBar/SideBar";

class Home extends React.PureComponent {

    showPostContent(postId) {
        this.props.history.push(`/post/${postId}`);
        this.props.dispatch(showPost(postId));
    }

    render() {
        const cards = [
            {
                'avatar': 'avatar',
                'title': 'Something about URI & URL & Refer',
                'summary': 'spring项目使用Itext将HTML转为PDF,支持中文字体以及亚洲字体转换.亚洲字体需要IText-Asasin.jar包的支持,使用包中提供的字体可以完美支持亚洲字体.',
                'tags': ['URI','Servlet'],
                'date': '2018-02-02'
            },
            {
                avatar: 'avatar',
                title: 'IText生成PDF',
                summary: 'spring项目使用Itext将HTML转为PDF,支持中文字体以及亚洲字体转换.亚洲字体需要IText-Asasin.jar包的支持,使用包中提供的字体可以完美支持亚洲字体.',
                tags: ['Java'],
                date: '2017-12-01'
            },
        ];
        return (
            <div className='container'>
                <div className={'posts'}>
                    {
                        cards.map(v => (
                            <Card key={v.postId} postId={v.postId} title={v.title} avatar={v.avatar}
                                  summary={v.summary} tags={v.tags} date={v.date} showPost={(id) => this.showPostContent(id)} />
                        ))
                    }
                </div>
                <div className={'right-side-bar'}>
                    <SideBar />
                </div>

            </div>
        );
    }
}

export default withRouter(connect()(Home));
