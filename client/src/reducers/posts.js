import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

// action đưa tới reducer để return new state
// đặc trưng của reducer là các hàm của js
export default (posts = [], action) => {// post chính là parameter với giá trị mặc định
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));// so sánh với action nếu trùng id thì post đó được thay thế = action
    case CREATE:
      return [...posts, action.payload];// ghi đè lên mảng posts 
    case UPDATE:// edit một bài post
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));// tìm đúng post và thay thế post đó 
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);// trả về mảng ban đầu trừ đi phần tử trùng với action ( hàm filter tìm tất cả các phần tử thỏa mãn)
    default:
      return posts;// mặc định không có action nào trả về mảng truyền vào
  }
};


