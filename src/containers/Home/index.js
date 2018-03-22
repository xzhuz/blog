import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Card from '../Card';
import './home.scss';
import SideBar from "../SideBar";
import {getPopularPost, getPostList} from "../../reducers/blog.redux";
import Avatar from "../../components/Avatar";
import Tag from "../../components/Tag";
import Pagination from "../../components/Pagination";

class Home extends React.PureComponent {

    constructor(props) {
        super(props);
        this.goPage = this.goPage.bind(this);
        this.state = {
            current: 1
        };
    }

    showPostContent(postId) {
        this.props.history.push(`/post/${postId}`);
    }

    componentDidMount() {
        this.props.getPostList();
        this.props.getPopularPost();
    }

    renderCards(v, index) {
        return <Card key={index} postId={v._id} title={v.title} icon={v.icon}
                      summary={v.summary} tags={v.tags} date={v.date}
                      showPost={(id) => this.showPostContent(id)} showCardInfo={true}/>;
    }

    renderPagination(size) {
        return <Pagination initPage={1} pageSize={size} goPage={this.goPage} />;
    }

    goPage(page){
        this.setState({current: page});
    }

    render() {
        const {posts, popularPosts} = this.props;
        let tag = [];
        posts.map(v=> {
           tag = [...tag, ...v.tags];
        });
        tag = Array.from(new Set(tag));
        const skills = ['Java', 'JavaScript', 'JQuery', 'Tomcat', 'Spring', 'React'];
        const pageSize = Math.ceil(posts.length / 6 );
        const {current} = this.state;
        const begin = 6 * (current - 1);
        const end = (begin + 6) > pageSize ? pageSize : begin + 6;
        const postsData = [];
        for(let i = begin; i < end; i++){
            console.log(posts);
            postsData.push(posts[i]);
        }
        return (
            <div className='container'>
                <div className={'posts'}>
                    {
                        postsData.map((v, index) => (
                            this.renderCards(v, index)
                        ))
                    }
                    {
                        this.renderPagination(pageSize)
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
                            popularPosts.map((v, index) => (
                                <Card key={index} postId={v._id} title={v.title} icon={v.icon}
                                      summary={''} tags={v.tags} date={v.date}
                                      showPost={(id) => this.showPostContent(id)} showCardInfo={false} />
                            ))
                        }
                    </SideBar>
                    <SideBar barTitle={'标签'}>
                        {
                            tag.map((v, index) => (
                               <Tag label={v} key={index}/>
                            ))
                        }
                    </SideBar>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.listPost,
        popularPosts: state.loadPopular
    };
};

export default withRouter(connect(mapStateToProps, {getPostList, getPopularPost})(Home));
