import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import LzEditor from 'react-lz-editor';
import {getAboutMe, updateAboutMe} from "../../reducers/about.redux";
import Button from "../../components/Button";
import './modifyAboutMe.scss';

class ModifyAboutMe extends React.Component {

    constructor(props) {
        super(props);
        this.updateAbout = this.updateAbout.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.state = {
            about: '',
        };
    }

    componentDidMount() {
        this.props.getAboutMe();
    }

    contentChange(v) {
        this.setState({
            about: v
        });
    }

    updateAbout(v, aboutMe) {
        const newAbout = Object.assign({}, aboutMe, {about: this.state.about});
        this.props.updateAboutMe(newAbout);
    }

    render () {
        const aboutMe = this.props.aboutMe;
        const {errorMsg, successMsg} = this.props.msg;
        return (
            <div className={'container modify-about-container'}>
                <LzEditor
                    active={true}
                    importContent={aboutMe.about}
                    cbReceiver={this.contentChange}
                    image={false}
                    video={false}
                    audio={false}
                    convertFormat="markdown"
                />
                <div className={'modify-about-button'}>
                    <Button describe={'更新'} btnClick={(v) => this.updateAbout(v, aboutMe)} className={''}/>
                    {
                        successMsg
                            ? <span className={'success-msg'}>{successMsg}</span>
                            : ''
                    }
                    {
                        errorMsg
                            ? <span className={'error-msg'}>{errorMsg}</span>
                            : ''
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        aboutMe: state.aboutMe,
        msg: state.updateAboutMeError,
    };
};

export default withRouter(connect(mapStateToProps, {getAboutMe, updateAboutMe})(ModifyAboutMe));