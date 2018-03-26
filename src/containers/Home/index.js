import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Card from '../Card';
import './home.scss';
import SideBar from "../SideBar";
import {getPopularPost, getPostList, listAllPost, reduceVisit} from "../../reducers/blog.redux";
import Avatar from "../../components/Avatar";
import Tag from "../../components/Tag";
import ReadMore from '../../components/ReadMore';
import BottomOut from "../../components/BottomOut";

class Home extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            current: 1
        };
    }

    showPostContent(postId, visit) {
        this.props.history.push(`/post/${postId}`);
        this.props.reduceVisit({id: postId, visit: visit + 1});
    }

    componentDidMount() {
        this.props.getPostList();
        this.props.getPopularPost();
    }

    renderCards(v, index) {
        return <Card key={index} postId={v._id} title={v.title} icon={v.icon}
                      summary={v.summary} tags={v.tags} date={v.date}
                      showPost={(id) => this.showPostContent(id, v.visit)} showCardInfo={true}/>;
    }

    readMore(v) {
        this.setState(state => ({
            clicked: true,
            current: state.current + 1
        }));
    }

    renderReadMore(filled) {
        if (filled) {
            return <BottomOut/>;
        }
        return <ReadMore handleReadMore={(v) => this.readMore(v)}/>;
    }

    render() {
        const {posts, popularPosts} = this.props;
        const {current, clicked} = this.state;
        let tag = [];
        posts.map(v=> {
           tag = [...tag, ...v.tags];
        });
        tag = Array.from(new Set(tag));
        const skills = ['Java', 'JavaScript', 'JQuery', 'Tomcat', 'Spring', 'React'];
        const pageCapacity = clicked ? 3 : 6;
        return (
            <div className='container'>
                <div className={'posts'}>
                    {
                        posts.slice(0, current * pageCapacity).filter(v => v.publish).map((v, index) => (
                            this.renderCards(v, index)
                        ))
                    }
                    {
                        this. renderReadMore(current * pageCapacity >= posts.length)
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
        posts: state.listAllPost,
        popularPosts: state.loadPopular
    };
};

export default withRouter(connect(mapStateToProps, {getPostList, getPopularPost, reduceVisit})(Home));
