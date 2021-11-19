const express = require('express');
const port = 2000;

const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session')
const mysql = require('mysql');
let connection = mysql.createConnection({
    host: '35.184.198.68',
    user: 'root',
    password: '12345',
    database: 'test',
})

connection.connect();

// serve static contents
app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(session({
    'secret': '******',
    resave: false,
    saveUninitialized: false
}))
// dynamic handling
app.post('/admin-login', (req, res) => {
    const { username, password } = req.body;

    connection.query(`SELECT * FROM Person WHERE username='${username}'`, (error, results, fields) => {
        if (error) {
            res.redirect('/')
        };

        if (results[0]) {
            if (results[0].password === password) {
                res.cookie('admin', results[0].username)
                return res.redirect('/admin')
            }

        }
        res.redirect('/')

    })
})

app.get('/admin', (req, res) => {
    let message = req.session.message
    req.session.message = null;
    if (req.cookies.admin) {
        connection.query('SELECT * FROM Ava', (error, results, fields) => {
            let page = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="style.css">
                <title>Document</title>
            </head>
            <style>
               
                #slots {
                    magin:0px auto;
                }
                #slots div{
                    padding: 10px;
                    background-color: cornflowerblue;
                    margin: 1px;
                    color:white;
                }
               
            </style>
            <body>
            <ul>
                <li>
                    <a href="/doodles">Home</a>
                </li>
                <li>
                    <a href="/add-doodle">Add Doodle</a>
                </li>
                <li>
                     <a href="/admin">Manage Time slot</a>
                </li>
                <li>
                    <a href="/logout">Logout</a>
                </li>
            </ul>
                <h1>Admin Page</h1>
                <form action="/update-slots" method="POST">
                
                <h3>Available times</h3>
                    <div id="slots" style="display: flex;">
                        <div>
                            <input type="checkbox" name="slot1" id="slot1" ${results[0]['slot1'] === 1 ? 'checked' : ''
                }> <label for="slot1">Time 1</label>
                        </div >
                        <div>
                            <input type="checkbox" name="slot2" id="slot2" ${results[0]['slot2'] === 1 ? 'checked' : ''
                }> <label for="slot2">Time 2</label>
                        </div>
                        <div>
                            <input type="checkbox" name="slot3" id="slot3" ${results[0]['slot3'] === 1 ? 'checked' : ''
                }> <label for="slot3">Time 3</label>
                        </div>
                        <div>
                            <input type="checkbox" name="slot4" id="slot4" ${results[0]['slot4'] === 1 ? 'checked' : ''
                }> <label for="slot4">Time 4</label>
                        </div>
                        <div>
                            <input type="checkbox" name="slot5" id="slot5" ${results[0]['slot5'] === 1 ? 'checked' : ''
                }> <label for="slot5">Time 5</label>
                        </div>
                        <div>
                            <input type="checkbox" name="slot6" id="slot6" ${results[0]['slot6'] === 1 ? 'checked' : ''
                }> <label for="slot6">Time 6</label>
                        </div>
                        <div>
                            <input type="checkbox" name="slot7" id="slot7" ${results[0]['slot7'] === 1 ? 'checked' : ''
                }> <label for="slot7">Time 7</label>
                        </div>
                        <div>
                            <input type="checkbox" name="slot8" id="slot8" ${results[0]['slot8'] === 1 ? 'checked' : ''
                }> <label for="slot8">Time 8</label>
                        </div>
                        <div>
                            <input type="checkbox" name="slot9" id="slot9" ${results[0]['slot9'] === 1 ? 'checked' : ''
                }> <label for="slot9">Time 9</label>
                        </div>
                        <div>
                            <input type="checkbox" name="slot10" id="slot10" ${results[0]['slot10'] === 1 ? 'checked' : ''
                }> <label for="slot10">Time 10</label>
                        </div>
                    </div >
            <button>Update</button>
                </form >
                <h4>${message ? message : ''}<h4>
            </body >
            
            </html > `
            res.send(page)
        })


    } else {
        res.redirect('/')
    }
})


app.get('/doodles', (req, res) => {
    connection.query('SELECT * FROM doodles', (error, results, field) => {
        let page = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="style.css">
            <title>doodles</title>
        </head>

        <body>
            <ul>
                <li>
                    <a href="/doodles">Home</a>
                </li>
                <li>
                    <a href="/add-doodle">Add Doodle</a>
                </li>
                `
        page += req.cookies.admin ? `
                <li>
                     <a href="/admin">Manage Time slot</a>
                </li>
                <li>
                    <a href="/logout">Logout</a>
                </li>`: `
                <li>
                    <a href="/">Admin Login </a>
                </li>
                `
        page += `
            </ul>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Time 1</th>
                        <th>Time 2</th>
                        <th>Time 3</th>
                        <th>Time 4</th>
                        <th>Time 5</th>
                        <th>Time 6</th>
                        <th>Time 7</th>
                        <th>Time 8</th>
                        <th>Time 9</th>
                        <th>Time 10</th>
                    </tr>
                </thead>
                <tbody>
                    `
        for (let i = 0; i < results.length; i++) {
            page += `<tr>
            <td>
               ${results[i].username} 
            </td>
            <td class="${results[i].slot1 === 1 ? 'checked' : ''}">
              
            </td>
            <td class="${results[i].slot2 === 1 ? 'checked' : ''}">
              
            </td>
            <td class="${results[i].slot3 === 1 ? 'checked' : ''}">
              
            </td>
            <td class="${results[i].slot4 === 1 ? 'checked' : ''}"> 
               
            </td>
            <td class="${results[i].slot5 === 1 ? 'checked' : ''}">
               
            </td >
            <td class="${results[i].slot6 === 1 ? 'checked' : ''}">
             
            </td>
            <td class="${results[i].slot7 === 1 ? 'checked' : ''}">
              
            </td>
            <td class="${results[i].slot8 === 1 ? 'checked' : ''}">
               
            </td>
            <td class="${results[i].slot9 === 1 ? 'checked' : ''}">
              
            </td>
            <td class="${results[i].slot10 === 1 ? 'checked' : ''}">
               
            </td>
            </tr>`
        }

        page += `</tbody>
                </table>
            </body>
            `
        res.send(page)
    })
})



app.get('/add-doodle', (req, res) => {
    connection.query('SELECT * FROM Ava', (error, results, fields) => {
        let page = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <title>Document</title>
    </head>
    <style>
        #slots div{
            padding: 10px;
            background-color: cornflowerblue;
            margin: 1px;
        }
    </style>
    <body>
        <ul>
        <li>
            <a href="/doodles">Home</a>
        </li>
        <li>
            <a href="/add-doodle">Add Doodle</a>
        </li>`
        page += req.cookies.admin ? `
        <li>
            <a href="/admin">Manage Time slot</a>
        </li>
        <li>
            <a href="/logout">Logout</a>
        </li>`: `
        <li>
            <a href="/">Admin Login </a>
        </li>
        `
        page += `
        </ul>
        <h1>Add Doodle</h1>
       
        <form action="/add-doodle" method="POST">
            <div id="slots" style="display: flex;">
                <div>
                    <input type="text" name="username" placeholder="Your name" required> 
                </div>
                <div>
                    <input ${results[0]['slot1'] === 0 ? 'disabled' : ''
            } type="checkbox" name="slot1" id="slot1"> <label for="slot1">Time 1</label>
                </div>
                <div>
                    <input ${results[0]['slot2'] === 0 ? 'disabled' : ''
            } type="checkbox" name="slot2" id="slot2"> <label for="slot2">Time 2</label>
                </div>
                <div>
                    <input ${results[0]['slot3'] === 0 ? 'disabled' : ''
            } type="checkbox" name="slot3" id="slot3"> <label for="slot3">Time 3</label>
                </div>
                <div>
                    <input ${results[0]['slot4'] === 0 ? 'disabled' : ''
            } type="checkbox" name="slot4" id="slot4"> <label for="slot4">Time 4</label>
                </div>
                <div>
                    <input ${results[0]['slot1'] === 0 ? 'disabled' : ''
            } type="checkbox" name="slot5" id="slot5"> <label for="slot5">Time 5</label>
                </div>
                <div>
                    <input ${results[0]['slot6'] === 0 ? 'disabled' : ''
            } type="checkbox" name="slot6" id="slot6"> <label for="slot6">Time 6</label>
                </div>
                <div>
                    <input ${results[0]['slot7'] === 0 ? 'disabled' : ''
            } type="checkbox" name="slot7" id="slot7"> <label for="slot7">Time 7</label>
                </div>
                <div>
                    <input ${results[0]['slot8'] === 0 ? 'disabled' : ''
            } type="checkbox" name="slot8" id="slot8"> <label for="slot8">Time 8</label>
                </div>
                <div>
                    <input ${results[0]['slot9'] === 0 ? 'disabled' : ''
            } type="checkbox" name="slot9" id="slot9"> <label for="slot9">Time 9</label>
                </div>
                <div>
                    <input ${results[0]['slot10'] === 0 ? 'disabled' : ''
            } type="checkbox" name="slot10" id="slot10"> <label for="slot10">Time 10</label>
                </div>
            </div>
            <button>Add</button>
        </form>
    
    </body>
    
    </html>`

        res.send(page)
    })
})

app.post('/add-doodle', (req, res) => {
    const {
        username,
        slot1,
        slot2,
        slot3,
        slot4,
        slot5,
        slot6,
        slot7,
        slot8,
        slot9,
        slot10
    } = req.body;
    connection.query(`INSERT INTO doodles(username, slot1,slot2,slot3,slot4,slot5,slot6,slot7,slot8,slot9,slot10) VALUES(
            '${username}',
            ${!!slot1 ? 1 : 0},
            ${!!slot2 ? 1 : 0},
            ${!!slot3 ? 1 : 0},
            ${!!slot4 ? 1 : 0},
            ${!!slot5 ? 1 : 0},
            ${!!slot6 ? 1 : 0},
            ${!!slot7 ? 1 : 0},
            ${!!slot8 ? 1 : 0},
            ${!!slot9 ? 1 : 0},
            ${!!slot10 ? 1 : 0})`, (error, results, fields) => {
        if (error)
            console.log(error)
        res.redirect('/doodles')
    })

})

app.post('/update-slots', (req, res) => {
    const {
        slot1,
        slot2,
        slot3,
        slot4,
        slot5,
        slot6,
        slot7,
        slot8,
        slot9,
        slot10
    } = req.body
    if (req.cookies.admin) {
        console.log(slot1,
            slot2,
            slot3,
            slot4,
            slot5,
            slot6,
            slot7,
            slot8,
            slot9,
            slot10)
        connection.query(`UPDATE Ava SET 
        slot1=${!!slot1}, 
        slot2=${!!slot2},
        slot3=${!!slot3},
        slot4=${!!slot4},
        slot5=${!!slot5},
        slot6=${!!slot6},
        slot7=${!!slot7},
        slot8=${!!slot8},
        slot9=${!!slot9},
        slot10=${!!slot10}`, (error, results, fields) => {
            req.session.message = 'Updated'
            res.redirect('/admin')
        })
    } else
        res.redirect('/admin')
})

app.get('/logout', (req, res) => {
    res.clearCookie("admin");
    res.redirect('/doodles')
})

app.listen(port, () => {
    console.log("port: " + port)
});