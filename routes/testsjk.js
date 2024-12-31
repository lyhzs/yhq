//查询
app.get('/look', function (req, res) {
    // 查询时去除文章内容
    db.selectAll('select id,title,classify,timer,expl,ismy,islabel from document', (e, r) => {
        // db.selectAll('select * from document',(e,r)=>{
        if (e) {
            res.status(200).json({
                "status": false,
                "msg": e,
                "data": []
            });
        }
        res.status(200).json({
            "status": true,
            "msg": "",
            "data": r
        });
    })
});

//查询具体文章
app.get('/lookdetails', function (req, res) {
    // 获取get请求参数
    var adminuser = req.query
    // console.log(adminuser)
    db.selectAll(`select id,bodytext,title from document  WHERE id=${adminuser.id}`, (e, r) => {
        if (e) {
            res.status(200).json({
                "status": false,
                "msg": e,
                "data": []
            });
        }
        res.status(200).json({
            "status": true,
            "msg": "",
            "data": r
        });
    })
});

//删除
app.post('/del', function (req, res) {

    var adminuser = req.body
    // console.log(adminuser.id,12345);
    db.deleteData("document", {
        "id": adminuser.id
    }, (e, r) => {
        if (e) {
            res.status(200).json({
                "status": false,
                "msg": e,
                "data": []
            });
        }
        res.status(200).json({
            "status": true,
            "msg": "",
            "data": r
        });
    })
});
//测试git

//添加
app.post('/add', function (req, res) {

    var adminuser = req.body

    // console.log(adminuser) // 往数据库种添加的数据
    db.insertData("document", adminuser, (e, r) => {
        console.log(e)
        if (e) {
            console.log("false")
            res.send({
                state: false,
                data: {}
            })
        } else {
            console.log("true")
            res.send({
                state: true,
                data: adminuser
            })
        }

    })
});

//登录
app.post('/login', function (req, res) {

    var adminuser = req.body
    //console.log(req.session.userinfo)

    //cookies没过期 直接登陆成功
    if (req.session.userinfo) {
        res.send({
            state: true,
            data: req.session.userinfo
        })
    } else {
        //cookies过期 登陆
        db.selectAll('select * from adminuser', (e, r) => {
            // console.log(r)
            // console.log(adminuser)

            var loginstatus = r.filter(item => item.name == adminuser.name)
            //  console.log(loginstatus)
            if (loginstatus.length > 0) {
                if (loginstatus[0].password == adminuser.password) {
                    //登陆成功 添加cookies 
                    if (adminuser.ischecked == "true") {
                        req.session.userinfo = adminuser.name;
                    }
                    res.send({
                        state: true,
                        data: "登录成功"
                    })
                } else {
                    res.send({
                        state: false,
                        data: "密码错误"
                    })
                }
            } else {
                res.send({
                    state: false,
                    data: "账号错误"
                })
            }


        })

    }




});

//更新
app.post('/updata', function (req, res) {

    var adminuser = req.body

    // console.log(adminuser) // 往数据库种添加的数据
    db.updateData("document", adminuser, {
        id: adminuser.id
    }, (e, r) => {
        console.log(e)
        if (e) {
            console.log("false")
            res.send({
                state: false,
                data: {}
            })
        } else {
            console.log("true")
            res.send({
                state: true,
                data: adminuser
            })
        }

    })
});