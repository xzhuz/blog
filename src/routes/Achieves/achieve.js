import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Map, List} from 'immutable';
import NProgress from 'nprogress';

import {dateFormat} from "../../utils/commentUtils";
import SideBar from "../../components/SideBar";
import './stylesheets/achieve.scss';

class Achieve extends React.Component {


    componentWillUnmount() {
        NProgress.done();
    }

    componentDidUpdate() {
        NProgress.done();
    }

    componentDidMount() {
        this.props.clearRelatives();
    }

    showPostContent(articleId) {
        this.props.history.push({
            pathname: `/article/${articleId}`
        });
    }

    renderAchieve() {
        const {achieves} = this.props;
        const keys = [...achieves.keys()];
        return keys.sort((a, b) => b - a).map(key => {
            const value = achieves.get(key);
            return <section className='achieve' key={`${key}-${value}`}>
                <h1 className='achieve-header'>{key}</h1>
                {
                    this.renderAchieveItems(value)
                }
            </section>;
        });
    }

    renderAchieveItems(value) {
        return value.map(data => {
            const id = data.get('id');
            const date = dateFormat(data.get('date'));
            const title = data.get('title');
            return <p key={`${id}`} className='achieve-items'><Link to={`/article/${id}`}>{date} {title}</Link></p>;
        });
    }

    render() {

        return (
            <div className='container'>
                <div className='achieves'>
                    {
                        this.renderAchieve()
                    }
                </div>
                <SideBar/>
            </div>
        );
    }
}

Achieve.propTypes = {
    achieves: PropTypes.instanceOf(Map),
    showPostContent: PropTypes.func,
    clearRelatives: PropTypes.func.isRequired,
};

export default Achieve;
