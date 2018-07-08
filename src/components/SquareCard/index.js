import React from 'react';
import PropTypes from 'prop-types';

import * as FontAwesome from 'react-icons/lib/fa';
import {formatDate} from "../../utils/commentUtils";
import './squareCard.scss';

class SquareCard extends React.PureComponent{

    showArticle(id) {
        this.props.showPostContent(id);
    }

    render() {
        const {thumb, title, date, compliment, visit, id} = this.props;
        return (
            <div className='square-card' onClick={() => this.showArticle(id)}>
                <div className='square-card-container'>
                    <div className='square-card-thumb'>
                       <img src={thumb} />
                    </div>
                    <div className='square-card-items'>
                        <div className='square-card-title'>
                            <h1>{title}</h1>
                        </div>
                        <div className='square-card-info'>
                            <div className='square-card-date'>
                                <span><FontAwesome.FaCalendar/>{formatDate(date)}</span>
                            </div>
                            <div className='square-card-other'>
                                <span><FontAwesome.FaEye/>{visit}</span>
                                <span><FontAwesome.FaThumbsUp/>{compliment}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

SquareCard.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    compliment: PropTypes.number.isRequired,
    visit: PropTypes.number.isRequired,
    summary: PropTypes.string,
    thumb: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    showPostContent: PropTypes.func.isRequired,
};

export default SquareCard;