import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

// nhận setCurrentId từ App component
const Posts = ({ setCurrentId }) => {
  // lấy data để truyền cho component và con của nó bằng useSelector
  const posts = useSelector((state) => state.posts);// truy cập vào state của store, state có được từ api
  const classes = useStyles();
  console.log(posts);// có thể kiểm tra mongodb atlas để xem collections
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
