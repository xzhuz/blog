import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {login} from "../../reducers/user.redux";
import './login.scss';
import InputItem from "../../components/InputItem";

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
            <div className={'container'}>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <div className={'login-panel'}>
                    <p>Login Board</p>
                    <InputItem inputType={'text'} handleChange={(v) => this.handleChange('user', v)} holder={'Username'}/>
                    <InputItem inputType={'password'} handleChange={(v) => this.handleChange('pwd', v)} holder={'Password'}/>
                    <div className={'login-button'}>
                        <button type={'button'} onClick={this.login} >登录</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(connect(state => state.user, {login})(Login));