> cd server  
npm init -y khởi tạo tự động với tham số mặc định  
+ thêm type: module vào package.json
# cách dùng routes để không viết lại nhiều lần một url quá dài
## index.js  
    import postRoutes from './routes/posts.js';    
    app.use('/posts', postRoutes);
thực chất thì '/posts' = postRoutes = '/' 
## routes/posts.js
    const router = express.Router(); 
    router.get('/',callback)
    export default router
như vậy khi khai báo get một url sẽ là dạng rút gọn
# Cách dùng controllers để tách call back ra khỏi routes, callback là các tương tác với db và trình duyệt
## controllers/posts.js
    export const getPosts = callback
## routes/posts.js
    import { getPosts } from '../controllers/posts.js';
như vậy getPots chính là một thuộc tính của Object = export const getPosts = callback
# Cách dùng models để định dạng dữ liệu khi tương tác với db và tương tác với trình duyệt
## server\models\postMessage.js
    const postSchema = mongoose.Schema({
        title: String,
        createdAt: {
            type: Date,
            default: new Date(),
        },
    })

    var PostMessage = mongoose.model('PostMessage', postSchema);// PostMessage biến đổi thành tên của collections trong mongodb bằng cách chuyển sang số nhiều

    export default PostMessage;
# Cách dùng chung một định dạng dữ liệu trong nhiều tương tác db
## server\controllers\posts.js
    import PostMessage from '../models/postMessage.js';// dùng chung cái định dạng dữ liệu này như một chuẩn đầu ra và đầu vào db
    export const getPosts = async (req, res) => { 
        try {
            const postMessages = await PostMessage.find();
                    
            res.status(200).json(postMessages);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
https://www.restapitutorial.com/httpstatuscodes.html

# Cách deploy lên heroku 
    heroku.com -> login -> new app (memories-project1992)-> install heroku CLI 
    $ heroku -v 
    $ heroku login 
    $ cd my-project/
    $ git init
    $ heroku git:remote -a memories-project1992
    create file .gitignore and Procfile (web: npm run start)
    insert to index.js:   
        app.use('/',(req,res) => {
            res.send('Hello to memories API');
        })  
    in file .env remove (PORT = 5000)
    $ git add .
    $ git commit -am "make it better"
    $ git push heroku master  
sau đó trở lại heroku và overview -> Latest activity thấy  Deployed và Build succeeded -> open App -> browser "Hello to memories API"
Nếu xuất hiện lỗi thì: 
    heroku logs --tail --app your_app_name
    package.json ("start": "nodemon index.js", // khi deploy lên heroku thì phải đổi thành node)
    phải tạo file .gitignore bên trong server thì mới hết lỗi (nodemodule rất nặng)

# kiểm tra API trên heroku ex: https://memories-project1992.herokuapp.com/posts 
có dạng array của những document [{document},{document}...]
## thay thế url mặc định = https://memories-project1992.herokuapp.com/posts 



