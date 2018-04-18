import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';
import axios from "axios/index";
import {loadUser} from "../../actions/user.index";
import './dashboard.scss';
import BoardRouter from "../BoardRouter";
import Publish from "../Publish";
import ArticleList from '../ArticleList';
import NotFound from "../../components/NotFound";
import ModifyBlog from "../ModifyArticle";
import ModifyAboutMe from '../ModifyAboutMe';
class Dashboard extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            dashMenu: []
        };
    }

    componentDidMount() {
        // 获取用户信息
        axios.get('/user/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    // 用登录信息
                    this.props.loadUser(res.data.data);
                } else {
                    this.props.history.push('/login');
                }
            }
        });
    }

    handleClick(v, index) {
        this.setState(
            {dashMenu: this.props.menu.map((v, i) => {
                return {...v, active: i === index};
            })}
            );
    }

    render() {
        const {pathname} = this.props.location;
        return (
            <div className={'dashboard-container'}>
                <div className={'dashboard-side-bar'}>
                    <div className={'board-router'}>
                        <ul>
                            <li className={pathname === '/dashboard/list' ? 'active-link' : ''}><BoardRouter toPath={'/dashboard/list'} describe={'列表'} /></li>
                            <li className={pathname === '/dashboard/publish' ? 'active-link' : ''}><BoardRouter toPath={'/dashboard/publish'} describe={'发布'} /></li>
                            <li className={pathname === '/dashboard/modify' ? 'active-link' : ''}><span className={'self-router'}>更新</span></li>
                            <li className={pathname === '/dashboard/aboutme' ? 'active-link' : ''}><BoardRouter toPath={'/dashboard/aboutme'} describe={'关于'}/></li>
                        </ul>
                    </div>
                </div>
                <div className={'dashboard-board'}>
                        <Switch>
                            <Route path='/dashboard/publish' component={Publish}/>
                            <Route path='/dashboard/modify' component={ModifyBlog}/>
                            <Route path='/dashboard/list' component={ArticleList}/>
                            <Route path='/dashboard/aboutme' component={ModifyAboutMe}/>
                            <Route componet={NotFound}/>
                        </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};


export default withRouter(connect(mapStateToProps, {loadUser})(Dashboard));