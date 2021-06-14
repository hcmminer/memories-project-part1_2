import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';// action

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));// truy cập vào state của store, state có được từ api, state là object nên có thể truy cập vào các thuộc tính của nó (posts)
  const dispatch = useDispatch();
  const classes = useStyles();

  // mỗi khi component có gì bị ảnh hưởng thì hàm bên trong chạy (ở đây đối số thứ 2 là post mà thay dổi thì mới chạy <=> componentDidUpdate (data gắn vào component thay dổi))
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);// nếu đối số thứ 2 mà [] thì <=> componentDidMount (đã gắn vào DOM)

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {// nếu đây là lần đầu tiên tạo dữ liệu thì không có dữ liệu để so sánh nên sẽ là tạo mới một bài viết
      dispatch(createPost(postData));// truyền vào action khi nhấn submit
      clear();
    } else {
      dispatch(updatePost(currentId, postData));// nếu bài viết đã có thì đây là update lại bài viết đó
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      {/*{`${classes.root} ${classes.form}`} kế thùa những class gốc của form mà ghi đè tùy biến */}
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        {/* currentId là một bài post đã có _id trong database nên editing... */}
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        {/* string tags này được phân thành mảng chứa các tag*/}
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>        
      </form>
    </Paper>
  );
};

export default Form;
