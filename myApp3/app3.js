var express = require('express');
var mySql = require ('mysql');
var app = express();

var connection = mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
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

app.get('/user',function(req,res){
    var name = req.params.name;
    console.log (name);

    queryUser(function(err,result){
        res.end(result);
    });
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

function queryUser (callback)
{
    var json = '';
    connection.query("SELECT * FROM user WHERE name = 'Deckard'",
    function (err, rows, fields)
    {
        if (err) throw err;
        
        json = JSON.stringify(rows);

        callback(null,json);
    });
}