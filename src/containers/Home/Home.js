import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Card from '../Card/Card';
import './home.scss';
import SideBar from "../SideBar";
import {getPostList} from "../../reducers/blog.redux";
import Avatar from "../../components/Avatar";
import Tag from "../../components/Tag";

class Home extends React.PureComponent {

    showPostContent(postId) {
        this.props.history.push(`/post/${postId}`);
    }

    componentDidMount() {
        this.props.getPostList();
    }

    render() {
        const {posts} = this.props;
        const popularBlogs = [
            {
                '_id': '1',
                'icon': 'cardicon',
                'title': 'Something about URI & URL & Refer',
                'summary': 'spring项目使用Itext将HTML转为PDF,支持中文字体以及亚洲字体转换.亚洲字体需要IText-Asasin.jar包的支持,使用包中提供的字体可以完美支持亚洲字体.',
                'content': 'spring项目使用Itext将HTML转为PDF,支持中文字体以及亚洲字体转换.亚洲字体需要IText-Asasin.jar包的支持,使用包中提供的字体可以完美支持亚洲字体.',
                'tags': ['URI', 'Servlet'],
                'date': '222'
            },
            {
                '_id': '2',
                'icon': 'cardicon',
                'title': 'Something about URI & URL & Refer',
                'summary': 'spring项目使用Itext将HTML转为PDF,支持中文字体以及亚洲字体转换.亚洲字体需要IText-Asasin.jar包的支持,使用包中提供的字体可以完美支持亚洲字体.',
                'content': 'spring项目使用Itext将HTML转为PDF,支持中文字体以及亚洲字体转换.亚洲字体需要IText-Asasin.jar包的支持,使用包中提供的字体可以完美支持亚洲字体.',
                'tags': ['URI', 'Servlet'],
                'date': '222'
            },
        ];
        const skills = ['Java', 'JavaScript', 'JQuery', 'Tomcat', 'Spring', 'React'];
        return (
            <div className='container'>
                <div className={'posts'}>
                    {
                        posts.map((v, index) => (
                            <Card key={index} postId={v._id} title={v.title} icon={v.icon}
                                  content={v.content} tags={v.tags} date={v.date}
                                  showPost={(id) => this.showPostContent(id)} showCardInfo={true}/>
                        ))
                    }
                </div>
                <div className={'right-side-bar'}>
                    <SideBar barTitle={'关于我'}>
                        <div className={'about-me'}>
                            <Avatar avatar={'avatar'}/>
                            <div className={'me'}>
                                <div className={'me-name'}>
                                    <span className={'me-menu'}>Name</span> <span>Mei Sen</span>
                                </div>
                                <div className={'me-major'}>
                                    <span className={'me-menu'}>Major</span> <span>Java程序员</span>
                                </div>
                                <div className={'me-skill'}>
                                    <span className={'me-menu'}>Skills</span>
                                    <div>
                                    {
                                        skills.map((value,index) => (
                                           <Tag key={index} label={value}/>
                                        ))
                                    }
                                    </div>
                                </div>
                                <div className={'me-mail'}>
                                    <span className={'me-menu'}>Mail</span> <span>ms915818993@163.com</span>
                                </div>
                                <div className={'me-location'}>
                                    <span className={'me-menu'}>Location</span> <span>重庆</span>
                                </div>
                            </div>
                        </div>
                    </SideBar>
                    <SideBar barTitle={'热门博客'}>
                        {
                            posts.map((v, index) => (
                                <Card key={index} postId={v._id} title={v.title} icon={v.icon}
                                      content={''} tags={[]} date={''}
                                      showPost={(id) => this.showPostContent(id)} showCardInfo={false} />
                            ))
                        }
                    </SideBar>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {posts: state.listPost};
};

export default withRouter(connect(mapStateToProps, {getPostList})(Home));
