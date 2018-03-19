var mySql = require ('mysql');
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
 /*
connection.query ('SELECT * FROM user', function(err,rows,fields){
    if (err) throw err;

    for (var i in rows)
    {
        console.log('user : ', rows[i].name, 'score : ', rows[i].score);
    }
});
*/

var values = {name: 'Abrams', password: '753951', score: 789};

connection.query ('INSERT INTO user SET ?', values, function(err,result){
    if (err) throw err;

    console.log (result);
});

connection.end (function(err){
    console.log ('Terminated Connection');
})

console.log ('App2 test mysql : running');