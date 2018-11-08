import React from 'react';
import Loading from "../../components/Loading";
import BasicLayout from "../../components/BasicLayout";
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
            const proc = fetchArticle();
            proc.then((value) => {
                if (!value || Object.keys(value).length === 0) {
                    this.props.history.push('/404');
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
                <BasicLayout>
                    {
                        isLoading ? <Loading/> : <WrappedComponent article={article}/>
                    }
                </BasicLayout>
            );
        }
    };

