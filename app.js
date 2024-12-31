var createError = require('http-errors');
var express = require('express');


var mysql = require('mysql');     //引入mysql模块

var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var prodRouter = require('./routes/prod');
var bodyParser = require('body-parser');//解析,用req.body获取post参数
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var session = require('express-session'); 
var app = express();
const port = 1280 // 从环境变量中获取端口号

app.use(cookieParser())
//配置中间件

app.use(session({
  resave: true, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'admin', //密钥
  name: 'islogin', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {
      maxAge: 1000*60*60*24
  } //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
}));


app.all('*', function (req, res, next) {
  // if( req.headers.origin == "http://180.76.151.100:801" || "http://192.168.31.219:8082" ){
  //       res.header("Access-Control-Allow-Origin", req.headers.origin);
  //        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  //       res.header('Access-Control-Allow-Credentials', 'true');
  //       res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //        res.header('Access-Control-Allow-Headers', 'Content-Type');
  //   }
   next();	
 });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})) 
const db = require("./db")


// 商品表
app.use('/prod', prodRouter);



// connection.end();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
