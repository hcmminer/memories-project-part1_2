> cd client  
> npx create-react-app ./ tự động tạo ra các thư mục bên trong thư mục hiện tại
## mặc định trong src App.js là component và index.js là main js chạy đầu tiên gắn component vào DOM bằng việc gọi hàm:  
    ReactDom.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
tại đây ta có thể import các component tự tạo hay các thư viện css khác  
# Cách ghi đè css vào các các component của thư viện Material
## client\src\styles.js
    import { makeStyles } from '@material-ui/core/styles';

    export default makeStyles(() => ({
        appBar: {
            borderRadius: 15,
        },
        heading: {
            color: 'rgba(0,183,255, 1)',
        },
        image: {
            marginLeft: '15px',
        },
    }));
dùng các tên key tùy ý và các tên key css theo quy tắc camelCase và bỏ dấu "-"
## client\src\App.js
    const App = () => {
        const classes = useStyles();
    }
    ...
    <AppBar className={classes.appBar} ></AppBar>
có thể truyền vào useStyles(props) để tùy biến css theo tham số props  
class tham chiếu đến key của Object classes
# Cách viết API để tương tác với dữ liệu được gắn vào url
## client\src\api\index.js
    import axios from 'axios';

    const url = 'http://localhost:5000/posts';

    export const fetchPosts = () => axios.get(url);
    export const createPost = (newPost) => axios.post(url, newPost);
    export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
    export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
    export const deletePost = (id) => axios.delete(`${url}/${id}`);

# cách liên kết react với node server 
khi dùng cors trong node thì nó sẽ chặn mọi proxy nên
thêm dòng này vào package.json 
    "proxy": "http://localhost:5000"

# cách deploy FE lên server online: netlify.com -> Sites -> "Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"
    $ npm run build
    right click on build folder then select reveal in file explore (reveal in Finder) kéo thả vào phần upload của site -> hiện link của web -> domain -> Options -> thay đổi tên miền
    Ta có website hoàn chỉnh chạy hoàn toàn trên cloud

