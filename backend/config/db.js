import mysql from 'mysql2/promise';

const db = mysql.createPool({
    user:'root',
    password:'asya.2003',
    host:'localhost',
    database:'deptApp',
    port:3306,
});

console.log('mysql pool ready');

export default db  ;




