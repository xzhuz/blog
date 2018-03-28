import axios from "axios/index";
import {getCoverImg, getImgPath, RETURN_COVER_IMG, RETURN_IMG_PATH} from "../actions/file.index";
import {errorMsg} from "../actions/user.index";

const initState = {
};

export function imgFile(state = initState, action) {
    return action.type === RETURN_IMG_PATH ? action.payload : state;
}

export function coverImgFile(state = initState, action) {
    return action.type === RETURN_COVER_IMG ? action.payload : state;
}

export function uploadImg(formData) {
    return dispatch => {
        axios.post('/file/upload', formData, {
            headers: {
                'Content-Type': 'multiple/form-data'
            }
        }).then(res => {
            if (res.status === 200 && res.data.code === 0){
                dispatch(getImgPath(res.data.data));
            } else {
                dispatch(errorMsg('上传图片失败'));
            }
        });
    };
}

export function uploadCoverImg(formData) {
    return dispatch => {
        axios.post('/file/upload', formData, {
            headers: {
                'Content-Type': 'multiple/form-data'
            }
        }).then(res => {
            if (res.status === 200 && res.data.code === 0){
                dispatch(getCoverImg(res.data.data));
            } else {
                dispatch(errorMsg('上传头像失败'));
            }
        });
    };
}