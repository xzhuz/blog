import React from 'react';
import {connect} from 'react-redux';
import { Route, Switch, withRouter} from 'react-router-dom';
import axios from "axios/index";
import {loadUser} from "../../actions/user.index";
import './dashboard.scss';
import BoardRouter from "../BoardRouter";
import Publish from "../Publish";
import BlogList from '../BlogList';
import {loadMenuData} from "../../reducers/menu.redux";
import NotFound from "../../components/NotFound";

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

        // 获取目录信息
        this.props.loadMenuData();
    }

    handleClick(v, index) {
        this.setState(
            {dashMenu: this.props.menu.map((v, i) => {
                return {...v, active: i === index};
            })}
            );
    }
    render() {
        const {menu} = this.props;
        return (
            <div className={'dashboard-container'}>
                <div className={'dashboard-side-bar'}>
                    <div className={'board-router'}>
                        <ul>
                            {
                                menu.map((val, index) => (
                                    <li key={index} className={`${this.state.dashMenu[index]
                                        ? (this.state.dashMenu[index].active ? 'active-link': '')
                                        : (val.path === '/dashboard/publish' ? 'active-link' : '')}`}>
                                        <BoardRouter toPath={val.path} describe={val.describe} linkClick={v => this.handleClick(v, index)}/>
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                </div>
                <div className={'dashboard-board'}>
                    <Switch>
                        <Route path='/dashboard/publish' component={Publish}/>
                        <Route path='/dashboard/list' component={BlogList}/>
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
        menu: state.menu
    };
};


export default withRouter(connect(mapStateToProps, {loadUser, loadMenuData})(Dashboard));