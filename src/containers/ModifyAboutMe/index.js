import React from 'react';
import {connect} from "react-redux";
import {uploadThumb} from "../../reducers/file.redux";
import {withRouter} from "react-router-dom";
import {getAboutMe} from "../../reducers/about.redux";

class ModifyAboutMe extends React.PureComponent{

    componentDidMount() {
        this.props.getAboutMe();

    }
    render () {
        return (
            <div className={'container'}>
                sxz
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        msg: state.articlesMsg
    };
};

export default withRouter(connect(mapStateToProps, {getAboutMe, uploadThumb})(ModifyAboutMe));
