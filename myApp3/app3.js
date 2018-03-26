var express = require('express');
var mySql = require ('mysql');
var app = express();

var connection = mySql.createConnection({
    host:'cgmgameserver.cshyvbtfvili.ap-southeast-1.rds.amazonaws.com',
    user:'admin',
    password:'08012540',
    database:'game1'
});

connection.connect (function(err)
{
    if (err)
    {
        console.log ('Error Connection', err.stack);
        return;
    }
    console.log ('Connected as id', connection.threadId);
});


app.get('/users',function(req,res){
    queryAllUser(function(err,result){
        res.end(result);
    });
});

app.get('/user/:name',function(req,res){
    var name = req.params.name;
    console.log (name);

    queryUser(function(err,result){
        res.end(result);
    },name);
});

var server = app.listen(8081,function(){
    console.log('Server : Running');
});

function queryAllUser (callback)
{
    var json = '';
    connection.query('SELECT * FROM user',
    function (err, rows, fields)
    {
        if (err) throw err;
        
        json = JSON.stringify(rows);

        callback(null,json);
    });
}

function queryUser (callback,name)
{
    var json = '';
    connection.query("SELECT * FROM user WHERE name = ?",name,
    function (err, rows, fields)
    {
        if (err) throw err;
        
        json = JSON.stringify(rows);

        callback(null,json);
    });
}