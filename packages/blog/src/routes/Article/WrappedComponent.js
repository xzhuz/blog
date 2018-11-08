import React from 'react';
import Loading from "../../components/Loading";
import {fetchArticle} from "./modules";

export default WrappedComponent =>
    class extends React.PureComponent {
        state = {
            isLoading: true,
            article: {}
        };

        componentDidMount() {
            this.hideLoader();
        }

        hideLoader = () => {
            console.log(this.props);
            const proc = fetchArticle();
            proc.then((value) => {
                console.log(value);
                if (!value || Object.keys(value).length === 0) {
                    this.props.history.location.push('/404');
                } else {
                    this.setState({
                        isLoading: false,
                        article: value,
                    });
                }
            });
        };

        render() {
            const { article, isLoading } = this.state;
            return (
                <div>
                    {isLoading ? <Loading/> : <WrappedComponent article={article}/>}
                </div>
            );
        }
    };

// new Promise((resolve) => {
//     require.ensure([], (require) => {
//         resolve(require('./index'));
//     });
// })

