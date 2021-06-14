import axios from 'axios';

const url = 'https://memories-project1992.herokuapp.com/posts';

// sau khi controller của BE xử lý xong -> api -> action
// api như cầu nối front và back nó bao gồm các phương thức đặc trung của axios
// đặt tên api sao cho dễ phân biệt là được, thông thường nó hay trùng tên với action
export const fetchPosts = () => axios.get(url);// lấy hết mọi thứ từ url
export const createPost = (newPost) => axios.post(url, newPost);// thêm dữ liệu vào url
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);// cập nhật số lượt thích của bài viết thứ id
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);// cập nhật toàn bộ dũ liệu hiện có của bài viết thứ id, nếu nó không tồn tại thì không thêm mới ( khác với put)
// xóa một bài post thì axios xẽ tự tạo ra req gửi đến http://localhost:5000/posts/id và kích hoạt controller trong BE
export const deletePost = (id) => axios.delete(`${url}/${id}`);// nếu tìm thấy bài viết thứ id thì xóa nó đi
