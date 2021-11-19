const mysql = require('mysql');
let connection = mysql.createConnection({
    host: '35.184.198.68',
    user: 'root',
    password: '12345',
    database: 'test',
})

connection.connect();

connection.query(`CREATE TABLE IF NOT EXISTS Person(username varchar(20),password varchar(20))`, (error, rows, fields) => {
    if (error) {
        console.log(error);
        return;
    }
    connection.query(`INSERT INTO Person(username, password) VALUES('admin', 'admin')`)
})

connection.query(`CREATE TABLE IF NOT EXISTS ava (slot1 tinyint(4) DEFAULT 1,slot2 tinyint(4) DEFAULT 1,slot3 tinyint(4) DEFAULT 1,slot4 tinyint(4) DEFAULT 1,slot5 tinyint(4) DEFAULT 1,slot6 tinyint(4) DEFAULT 1,slot7 tinyint(4) DEFAULT 1,slot8 tinyint(4) DEFAULT 1,slot9 tinyint(4) DEFAULT 1,slot10 tinyint(4) DEFAULT 1)`, (error, rows, fields) => {
    if (error) {
        console.log(error);
        return;
    }
})

connection.query(`CREATE TABLE IF NOT EXISTS doodles (id int(11) unsigned NOT NULL AUTO_INCREMENT,
    username varchar(20) DEFAULT NULL,
    slot1 tinyint(4) DEFAULT 0,
    slot2 tinyint(4) DEFAULT 0,
    slot3 tinyint(4) DEFAULT 0,
    slot4 tinyint(4) DEFAULT 0,
    slot5 tinyint(4) DEFAULT 0,
    slot6 tinyint(4) DEFAULT 0,
    slot7 tinyint(4) DEFAULT 0,
    slot8 tinyint(4) DEFAULT 0,
    slot9 tinyint(4) DEFAULT 0,
    slot10 tinyint(4) DEFAULT 0,
    PRIMARY KEY (id)
    )`, (error, rows, fields) => {
    if (error) {
        console.log(error);
        return;
    }
    connection.query(`INSERT INTO doodles(slot1,slot2,slot3,slot4,slot5,slot6,slot7,slot8,slot9,slot10) 
    VALUES(1,1,1,1,1,1,1,1,1,1)`)
})
