import { combineReducers } from 'redux';

import posts from './posts';

export const reducers = combineReducers({ posts });// gộp các reducer bao gồm post.js, ...vv ( các reducer tách thành từng file riêng dễ quản lý)



