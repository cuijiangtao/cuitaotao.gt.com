const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool({
	host:'localhost',   
	user:'root',		
	password:'123456',	
	database:'list',	
	port:3306			
})

router.post('/add',function(req,res){
 var json1=req.body;
    pool.getConnection(function(err,connection){
        if(err) throw err;
        connection.query(`SELECT * FROM user WHERE user='${json1.user}'`,function(err,rows){
            if(err) throw err;
             var data=rows;
            if(rows.length == 0){
                connection.query(`INSERT INTO user (user,pass) VALUES ('${json1.user}','${json1.pass}')`,function(err){
                    if(err) throw err;
                    connection.query('SELECT * FROM user',function(err,rows){
                                if(err) throw err;
                           res.send({"message":'注册成功'});
                     connection.release();

                    })
                
                   
                })
            }else {
            res.send({"message":'用户名已被注册'})
                connection.release();
        }
            
        })
    })
})
router.post('/dl',function(req,res){
      var json1=req.body;
    pool.getConnection(function(err,connection){
        if(err) throw err;
        connection.query(`SELECT * FROM user WHERE user='${json1.user}' AND pass='${json1.pass}'`,function(err,rows){
            if(err) throw err;
            if(rows.length == 0){
              res.send({"message":'账号或者密码错误'}) 
                 connection.release();
             }else{
                res.send({"message":'登录成功'})
                  connection.release();
             }
        })
    
    })
})




module.exports=router;
