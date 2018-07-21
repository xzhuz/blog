import React from 'react';
import Button from '../../components/Button';
import './stylesheets/login.scss';

class Login extends React.PureComponent{

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

    login(e) {

    }

    render () {
        return (
            <div className='container'>
                <form action='' className='login-panel'>
                    <p>后台登录</p>
                    <input type='text' onClick={(v) => this.handleChange('user', v)} placeholder='username'/>
                    <input type='password' onClick={(v) => this.handleChange('pwd', v)} placeholder='password'/>
                    <div className='login-button'>
                        <Button content='登录' btnClick={this.login}/>
                    </div>
                    <span className='error-msg'>{this.props.msg}</span>
                </form>
            </div>
        );
    }
}

export default Login;