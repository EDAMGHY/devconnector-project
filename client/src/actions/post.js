import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Add like
export const addLike = (postID) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postID}`);
    dispatch({ type: UPDATE_LIKES, payload: { id: postID, likes: res.data } });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// remove like
export const removeLike = (postID) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postID}`);
    dispatch({ type: UPDATE_LIKES, payload: { id: postID, likes: res.data } });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({ type: DELETE_POST, payload: id });
    dispatch(setAlert('Post removed successfully!', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete post
export const addPost = (formData) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  try {
    const res = await axios.post(`/api/posts`, formData, config);
    dispatch({ type: ADD_POST, payload: res.data });
    dispatch(setAlert('Post Added!', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// add comment
export const addComment = (postID, formData) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  try {
    const res = await axios.post(
      `/api/posts/comment/${postID}`,
      formData,
      config
    );
    dispatch({ type: ADD_COMMENT, payload: res.data });
    dispatch(setAlert('Comment Added!', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// remove comment
export const removeComment = (postID, commentID) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postID}/${commentID}`);
    dispatch({ type: REMOVE_COMMENT, payload: commentID });
    dispatch(setAlert('Comment Removed!', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
