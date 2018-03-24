import React from 'react';
import PropTypes from 'prop-types';
import './modifyCard.scss';
import Button from "../Button";

class ModifyCard extends React.PureComponent {

    clickShowPost(id) {
        this.props.handleClickShowPost(id);
    }

    clickRemovePost(id){
        this.props.handleClickRemovePost(id);
    }

    clickUpdatePost(id) {
        this.props.handleClickUpdatePost(id);
    }

    render() {
        const {_id, title} = this.props.items;
        return (
            <div className={'modify-card-wrap'}>
                <div className={'modify-card-info-wrap'}>
                    <span>{title}</span>
                </div>
                <div className={'modify-card-btn-wrap'}>
                    <Button describe={'修改'} btnClick={() => this.clickUpdatePost(_id)} />
                    <Button describe={'查看'} btnClick={() => this.clickShowPost(_id)} />
                    <Button describe={'删除'} btnClick={() => this.clickRemovePost(_id)} />
                </div>
            </div>
        );
    }
}

ModifyCard.propTypes = {
    items: PropTypes.object.isRequired,
    handleClickShowPost: PropTypes.func.isRequired,
    handleClickRemovePost: PropTypes.func.isRequired,
    handleClickUpdatePost: PropTypes.func.isRequired
};

export default ModifyCard;
