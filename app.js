const createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const projectRoutes = require('./routes/projects');
const restaurantRoutes = require('./routes/restaurants');
const rScriptRoutes = require('./routes/r_script');
// const restaurantRoutes = require('./routes/restaurants');
const ethinicityRoutes = require('./routes/ethinicities');
const interestRoutes = require('./routes/interests');
const clinicRoutes = require('./routes/clinics');
const communityRoutes = require('./routes/communities');
const storeRoutes = require('./routes/stores');

const app = express();

// const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://sp2:sp2@3daussie-bhmgw.mongodb.net/360oz';
// const url = 'mongodb://localhost:27017/rop';
mongoose.connect(url);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH,DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/projects',projectRoutes);
app.use('/restaurants',restaurantRoutes);

app.use('/ethinicities',ethinicityRoutes);
app.use('/rScript',rScriptRoutes);
app.use('/interest',interestRoutes);
app.use('/clinic',clinicRoutes);
app.use('/community',communityRoutes);
app.use('/store',storeRoutes);

// //导入proxy
// const proxy = require('http-proxy-middleware');
//
// //context可以是单个字符串，也可以是多个字符串数组，分别对应你需要代理的api,星号（*）表示匹配当前路径下面的所有api
// const context = [`/`, `/*`]
//
// //options可选的配置参数请自行看readme.md文档，通常只需要配置target，也就是你的api所属的域名。
// const options = {
//     target: 'http://35.189.58.222',
//     changeOrigin: true
// }
//
// //将options对象用proxy封装起来，作为参数传递
// const apiProxy = proxy(options)
//
// //现在你只需要执行这一行代码，当你访问需要跨域的api资源时，就可以成功访问到了。
// app.use(context, apiProxy)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = new Error('Not found');
  error.status(404);
  next(error);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
