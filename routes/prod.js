const express = require('express');
const router = express.Router();
const db = require("../db")
// 处理 GET 请求
router.get('/list', (req, res) => {
  // 查询时去除文章内容
  db.selectAll('select * from prod', (e, r) => {
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



module.exports = router;