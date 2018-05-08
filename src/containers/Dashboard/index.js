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
import ModifyArticle from "../ModifyArticle";
class Dashboard extends React.PureComponent {

    componentDidMount() {
        // 查询页面权限
        axios.get('/api/config/auth').then(res => {
            if (res.status === 200 && res.data.code !== 0 && res.data.data.auth !== 1) {
                this.props.history.push(`/`);
            }

            // 获取用户信息
            axios.get('/api/user/info').then(res => {
                if (res.status === 200 && res.data.code !== 0) {
                    // 目前会出现如果后台报错，这里进入的时候会无限发送请求
                    this.props.history.push(`/login`);
                }
            }).catch(error => {
                this.props.history.push(`/login`);
            });
        }).catch(error => {
            this.props.history.push(`/`);
        });


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
                        </ul>
                    </div>
                </div>
                <div className={'dashboard-board'}>
                        <Switch>
                            <Route path='/dashboard/publish' component={Publish}/>
                            <Route path='/dashboard/modify' component={ModifyArticle}/>
                            <Route path='/dashboard/list' component={ArticleList}/>
                            <Route componet={NotFound}/>
                        </Switch>
                </div>
            </div>
        );
    }
}


export default withRouter(Dashboard);
