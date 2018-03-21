import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {login} from "../../reducers/user.redux";

class Login extends React.PureComponent {

    constructor(props) {
        super(props);
        this.userLogin = this.userLogin.bind(this);
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

    userLogin() {
        this.props.login(this.state);
    }

    render () {
        return (
            <div style={{paddingTop: '100px'}}>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                UserName: <input type={'text'} onChange={(v) => this.handleChange('user', v)} /><br/>
                Password: <input type={'password'} onChange={(v) => this.handleChange('pwd', v)} /><br/>
                <button type={'button'} onClick={this.userLogin}>登录</button>
            </div>
        );
    }
}

export default withRouter(connect( state => state.user, {login})(Login));