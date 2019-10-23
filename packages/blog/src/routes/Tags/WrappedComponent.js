import React from 'react';
import Loading from "../../components/Loading";
import BasicLayout from "../../components/BasicLayout";
import {fetchAllTags} from "./modules";

export default WrappedComponent =>
    class extends React.PureComponent {
        state = {
            isLoading: true,
            tagList: [{}],
        };

        componentDidMount() {
            this.hideLoader();
        }

        hideLoader = () => {
            const proc = fetchAllTags();
            proc.then((value) => {
                console.log(value);
                if (!value || Object.keys(value).length === 0) {
                    this.props.history.push('/404');
                } else {
                    this.setState({
                        isLoading: false,
                        tagList: value,
                    });
                }
            });
        };

        render() {
            const { tagList, isLoading } = this.state;
            return (
                <BasicLayout>
                    {
                        isLoading ? <Loading/> : <WrappedComponent tagList={tagList}/>
                    }
                </BasicLayout>
            );
        }
    };

