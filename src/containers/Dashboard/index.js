import React from 'react';
import {connect} from 'react-redux';
import { Route, Switch, withRouter} from 'react-router-dom';
import axios from "axios/index";
import {loadUser} from "../../actions/user.index";
import './dashboard.scss';
import BoardRouter from "../BoardRouter";
import Publish from "../Publish";
import {loadMenuData} from "../../reducers/menu.redux";

class Dashboard extends React.PureComponent {

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

    handleClick(v){
        const { location: {pathname} } = this.props;
    }

    render() {
        const {menu} = this.props;
        return (
            <div className={'dashboard-container'}>
                <div className={'dashboard-side-bar'}>
                    <div className={'board-router'}>
                        <ul>
                            {
                                menu.map((v, index) => (
                                    <li key={index}>
                                        <BoardRouter toPath={v.path} describe={v.describe} linkClick={(v) => this.handleClick(v)}/>
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                </div>
                <div className={'dashboard-board'}>
                    <Switch>
                        <Route path='/dashboard/publish' component={Publish}/>
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