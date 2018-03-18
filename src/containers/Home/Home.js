import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Card from '../Card/Card';
import './home.scss';
import SideBar from "../SideBar";
import {getPostList} from "../../reducers/blog.redux";

class Home extends React.PureComponent {

    showPostContent(postId) {
        this.props.history.push(`/post/${postId}`);
    }

    componentDidMount() {
        this.props.getPostList();
    }

    render() {
        const {posts} = this.props;
        const cards = [
            {
                'icon': 'cardicon',
                'title': 'Something about URI & URL & Refer',
                'summary': 'spring项目使用Itext将HTML转为PDF,支持中文字体以及亚洲字体转换.亚洲字体需要IText-Asasin.jar包的支持,使用包中提供的字体可以完美支持亚洲字体.',
                'content': 'spring项目使用Itext将HTML转为PDF,支持中文字体以及亚洲字体转换.亚洲字体需要IText-Asasin.jar包的支持,使用包中提供的字体可以完美支持亚洲字体.',
                'tags': ['URI', 'Servlet'],
            },
            {
                postId: '2',
                avatar: 'avatar',
                title: 'IText生成PDF',
                summary: 'spring项目使用Itext将HTML转为PDF,支持中文字体以及亚洲字体转换.亚洲字体需要IText-Asasin.jar包的支持,使用包中提供的字体可以完美支持亚洲字体.',
                content: 'spring项目使用Itext将HTML转为PDF,支持中文字体以及亚洲字体转换.亚洲字体需要IText-Asasin.jar包的支持,使用包中提供的字体可以完美支持亚洲字体.',
                tags: ['Java'],
            },
        ];
        return (
            <div className='container'>
                <div className={'posts'}>
                    {
                        posts.map((v, index) => (
                            <Card key={index} postId={v._id} title={v.title} icon={v.icon}
                                  content={v.content} tags={v.tags} date={v.date}
                                  showPost={(id) => this.showPostContent(id)}/>
                        ))
                    }
                </div>
                <div className={'right-side-bar'}>
                    <SideBar/>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {posts: state.listPost};
};

export default withRouter(connect(mapStateToProps, {getPostList})(Home));
