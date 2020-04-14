/*处理路由地址中所有以/favorite开头的请求*/
const express = require('express')
const pool = require('../pool.js')
router = express.Router()
module.exports = router
router.get('/',(req,res,next)=>{
  let sql = 'select tpid,tpname from type ORDER BY tpid';
  pool.query(sql,(err,result)=>{
    if(err){
      next(err)
      return
    }
    res.send(result)
  })
})