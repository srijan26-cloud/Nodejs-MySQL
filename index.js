const express = require("express")
const mysql = require("mysql")

var PORT = process.env.PORT
const app = express()

//Create Connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'logincred'
})

//Connect to mysql
db.connect(err => {
    if(err)
        throw err
    else
        console.log("Connection Established..")
})

//Creating database
app.get('/createDb' ,(req , res) => {
    let sql = 'create database logincred'

    db.query(sql , (err) =>{
        if(err)
            throw err
        res.send('Database Created')
    })
})

//Creating table
app.get('/createTable' ,(req , res) => {
    let sql = 'create table employee(id int AUTO_INCERMENT , name varchar(255) , designation varchar(255) , PRIMARY KEY(id))'

    db.query(sql , (err) =>{
        if(err)
            throw err
        res.send('Table employee Created')
    })
})

//Inserting values to the table- employee
app.get('/insertRow' ,(req , res) => {
    let post = {name :"Srijan Chandra" , designation : "SDE2" }
    let sql = 'insert into employee set ?'
    db.query(sql , post , (err) =>{
        if(err)
            throw err
        res.json({message :'Record Inserted..' , post})
    })
})

//Select all employess
app.get('/selectAll' ,(req , res) => {
    let sql = 'select * from employee'

    db.query(sql , (err , results) =>{
        if(err)
            throw err
        
        res.json(results)
    })
})

//Update values of an employee
app.get('/updateRow/:id' ,(req , res) => {
    let newName = "Priyadarshi"
    let sql = `update employee set name = ${newName} where id = ${req.params.id}`
    db.query(sql , post , (err) =>{
        if(err)
            throw err
        res.send('Record Updated..')
    })
})

//Delete an employee
app.get('/deleteRow/:id' ,(req , res) => {
    let sql = `delete from employee where id = ${req.params.id}`
    db.query(sql , post , (err) =>{
        if(err)
            throw err
        res.send('Record Deleted..')
    })
})


app.listen(PORT , (req , res) => {
    console.log(`Listening at ${PORT}`)
})