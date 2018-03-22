import React from 'react';
import PropTypes from 'prop-types';
import './pagination.scss';

class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: this.props.initPage
        };
        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
    }

    onChange(index) {
        this.setState({
            current: index
        });
    }

    handleClick(e) {
        const index = e.target.innerHTML;
        if (!Number.isNaN(index)) {
            const page = Number.parseInt(index);
            this.onChange(page);
            this.props.goPage(page);
        }
    }

    previous() {
        const page = this.state.current;
        if (page <= 1) {
            return;
        }
        this.onChange(page - 1);
        this.props.goPage(page - 1);
    }

    next() {
        if (this.state.current >= this.props.pageSize) {
            return;
        }
        const page = this.state.current;
        this.onChange(page + 1);
        this.props.goPage(page + 1);
    }

    renderPage(page) {
        return <span className={page === this.state.current ? 'current' : ''} key={`less-${page}`}
                     onClick={this.handleClick}>{page}</span>;
    }

    renderNumber(pageSize) {
        const number = [];
        const current = this.state.current;
        if (pageSize < 6) {
            for (let index = 1; index < pageSize + 1; index++) {
                number.push(this.renderPage(index));
            }
        } else {
            if (current < 4) {
                for (let index = 1; index < 4; index++) {
                    number.push(this.renderPage(index));
                }
                number.push(
                    <span className="dot-next dot" alt="前进2页" key={`page-2`} onClick={this.jump}> </span>
                );
                number.push(this.renderPage(pageSize));
            } else if (current >= 4 && current <= pageSize - 3) {
                number.push(this.renderPage(1));
                number.push(
                    <span className="dot-prev dot" alt="后退2页" key={`page-1`} onClick={this.jump}> </span>
                );
                for (let index = current - 1; index < current + 2; index++) {
                    number.push(this.renderPage(index));
                }
                number.push(
                    <span className="dot-next dot" alt="前进2页" key={`page-2`} onClick={this.jump}> </span>
                );
                number.push(this.renderPage(pageSize));
            } else {
                number.push(this.renderPage(1));
                number.push(
                    <span className="dot-prev dot" alt="后退2页" key={`page-1`} onClick={this.jump}> </span>
                );
                for (let index = pageSize - 2; index <= pageSize; index++) {
                    number.push(this.renderPage(index));
                }
            }


        }
        return number;
    }

    render() {
        let prev = 'prev';
        let next = 'next';
        if (this.state.current <= 1) {
            prev = 'disabled prev';
        } else if (this.state.current >= this.props.pageSize) {
            next = 'disabled next';
        }

        return (
            <div className="pagination">
                <span onClick={this.previous} className={prev}> </span>
                {this.renderNumber(this.props.pageSize)}
                <span onClick={this.next} className={next}> </span>
            </div>
        );
    }
}

Pagination.propTypes = {
    initPage: PropTypes.number,
    goPage: PropTypes.func,
    pageSize: PropTypes.number,
    children: PropTypes.object
};

export default Pagination;
