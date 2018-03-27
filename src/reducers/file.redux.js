import {errorMsg} from "../actions/user.index";
import axios from "axios/index";
import {blogUpdated} from "../actions/blog.index";
import {getPost} from "./blog.redux";

export function uploadImg(formData) {
    return dispatch => {
        axios.post('/file/upload', formData, {
            headers: {
                'Content-Type': 'multiple/form-data'
            }
        }).then(res => console.log(res));
    };
}