/*处理路由地址中所有以/user开头的请求*/
const express = require('express')
const pool = require('../pool.js')
router = express.Router()
module.exports = router
router.get('/list',(req,res,next)=>{
  //1.读取客户端提交的请求数据
  let pageNum = req.query.pageNum
  if(!pageNum){
    pageNum = 1
  }else{
    pageNum = parseInt(pageNum)
  }
  let typeId = req.query.typeId;
  if(!typeId){
    typeId = 0
  }else{
    typeId = parseInt(typeId)
  }
  //2.执行数据库查询操作
  let output = {
    pageNum : pageNum ,//要显示的页号
    pageSize : 3,//页面大小，每页要显示的记录条数
    pageCount : 0 ,//符合条件的总页数
    totalCount : 0, //符合条件的总记录数
    list:[],//符合条件的记录数据
  }
  let condition = '' //where 语句的查询条件
  let placeholder = []
  if(typeId !=0){
    condition+= ' AND typeId=?'
    placeholder.push(typeId)
  }
  //查询出满足条件的记录总数，并计算出总页数
  let sql1 = 'SELECT COUNT(*) AS c FROM course WHERE 1'+condition
  pool.query(sql1,placeholder,(err,result)=>{
    if(err){
      // throw(err)
      next(err)
      return
    }
    
    output.totalCount = result[0].c//满足条件的总记录数
    output.pageCount = Math.ceil(output.totalCount/output.pageSize) //满足条件的总页数
    sql2 = 'SELECT cid,typeId,title,teacherId,clength,startTime,address,pic,price,tpid,tpname,tid,tname,maincourse,tpic FROM course AS c,type AS t,teacher AS h WHERE c.typeId=t.tpid AND  c.teacherId=h.tid '+condition+' ORDER BY cid DESC LIMIT ?, ?';
    placeholder.push((output.pageNum-1)*output.pageSize) //limit 后的第一个？ 从哪一条记录开始读取
    placeholder.push(output.pageSize) //limit 后的第二个? 一次最多读取的记录数量
    console.log(placeholder)
    pool.query(sql2,placeholder,(err,result)=>{
      if(err){
        // throw(err)
        next(err)
        return
      }
      output.list = result
      console.log(result)
      res.send(output)
    })
  })
  //3.
})
// 查询详情
router.get('/details',(req,res,next)=>{
  let cid = req.query.cid;
  console.log(cid)
  if(!cid){
    let output = {
      code : 400,
      msg : 'cid required'
    }
    res.send(output)
    return
  }else{
    cid = parseInt(cid)
  }
  let sql = 'select cid,typeId,title,teacherId,clength,startTime,address,pic,price,details,tid,tname,maincourse,tpic,experience,style FROM course AS c , teacher AS t WHERE c.teacherId = t.tid AND cid=?';
  pool.query(sql,[cid],(err,result)=>{
    if(err){
      next(err)
      return
    }
    if(result.length>0){
      
      res.send(result[0])
    }
  })
})
// 获取最新课程
router.get('/newest',(req,res,next)=>{
  let count = req.query.count;
  console.log(count)
  if(!count){
    count = 4
  }else{
    count = parseInt(count)
  }
  let sql = 'select cid,title,pic,price,tname,maincourse FROM course AS c , teacher AS t WHERE c.teacherId = t.tid ORDER BY cid DESC LIMIT ?';
  pool.query(sql,count,(err,result)=>{
    if(err){
      next(err)
      return
    }
    res.send(result)
  })
})
router.get('/hottest',(req,res,next)=>{
  let count = req.query.count;
  if(!count){
    count = 4
  }else{
    count = parseInt(count)
  }
  let sql = 'select cid,title,pic,price,tname,maincourse FROM course AS c , teacher AS t WHERE c.teacherId = t.tid ORDER BY buyCount DESC LIMIT ?';
  pool.query(sql,count,(err,result)=>{
    if(err){
      next(err)
      return
    }
    res.send(result)
  })
})