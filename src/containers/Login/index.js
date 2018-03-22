import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {login} from "../../reducers/user.redux";
import './login.scss';
import InputItem from "../../components/InputItem";
import Button from "../../components/Button";

class Login extends React.PureComponent {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            user: '',
            pwd: ''
        };
    }

    handleChange(key, val) {
        this.setState({
            [key]: val.target.value
        });
    }

    login() {
        this.props.login(this.state);
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
                    </div>
                    <span className={'error-msg'}>{this.props.msg}</span>
                </div>

            </div>
        );
    }
}

export default withRouter(connect(state => state.user, {login})(Login));