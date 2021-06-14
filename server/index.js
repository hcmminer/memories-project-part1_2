import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';// khai báo để tạo ra file .env khi cần cấu hình biến môi trường thì chỉ cần thay đổi file đó
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();// tự động nhận file .env

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);// cái này phải đặt sau app.use(cors())
app.get('/',(req,res) => {
  res.send('Hello to memories API');
});
// const CONNECTION_URL = 'mongodb+srv://vanbanpro:mot99hai@cluster0.nhy9q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const CONNECTION_URL = 'mongodb+srv://js_mastery:123123123@practice.jto9p.mongodb.net/test';
const PORT = process.env.PORT|| 5000;// khi deploy lên heroku thì không cần biến PORT môi trường trong .env vì heroku tự tạo ra biến môi trường

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);