import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';// các biến action.type được khai báo sẵn

import * as api from '../api/index.js';// các hàm của api

// Action Creators
// sau khi api xử lý -> action xử lý -> reducer
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();// thực chất gọi hàm fetchPosts() và lấy data từ api

    dispatch({ type: FETCH_ALL, payload: data });// cái này <=> return bỏ dispatch parameter
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);// sau khi backend trả về api thì FE tương tác với với api

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);// sau khi form kích hoạt event thì api gửi request tới controller và update likeCount xong xuôi thì mới hiển thị số lượt like tới FE

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
