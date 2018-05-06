import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {login, register} from "../../reducers/user.redux";
import './login.scss';
import InputItem from "../../components/InputItem";
import Button from "../../components/Button";
import axios from "axios/index";

class Login extends React.PureComponent {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            user: '',
            pwd: ''
        };
    }

    componentDidMount() {
        // 获取用户信息
        axios.get('/api/user/auth').then(res => {
            if (res.status === 200 && res.data.code !== 0 && res.data.data.auth !== 1) {
                this.props.history.push(`/`);
            }
        }).catch(error => {
            this.props.history.push(`/`);
        });
    }

    handleChange(key, val) {
        this.setState({
            [key]: val.target.value
        });
    }

    login() {
        this.props.login(this.state);
    }
    register() {
        this.props.register(this.state);
    }

    render() {
        return (
            <div className={'container login-container'}>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <div className={'login-panel'}>
                    <p>后台登录</p>
                    <InputItem inputType={'text'} handleChange={(v) => this.handleChange('user', v)} holder={'Username'} onEnter={this.login}/>
                    <InputItem inputType={'password'} handleChange={(v) => this.handleChange('pwd', v)} holder={'Password'} onEnter={this.login}/>
                    <div className={'login-button'}>
                        <Button describe={'登录'} btnClick={this.login}/>

                        <Button describe={'注册'} className={'no-class'} btnClick={this.register}/>
                    </div>
                    <span className={'error-msg'}>{this.props.msg}</span>
                </div>

            </div>
        );
    }
}

export default withRouter(connect(state => state.user, {login, register})(Login));
