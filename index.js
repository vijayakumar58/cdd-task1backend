const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const URL = process.env.DB;
const DB = "cddtask1";

app.listen(process.env.PORT || 3000);

app.use(express.json());
app.use(cors({
    orgin : "http://localhost:3001"
}))

app.get('/', function(req,res){
    res.send("Welcome to CRUD Application !")
})
// create data
app.post('/createdata', async function(req,res){
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        await db.collection('users').insertOne(req.body);
        await connection.close();
        res.json({message : "User Data Inserted Successfully"})
    } catch (error) {
        res.status(500).json({message : "Server Error"})
    }
})

// get alldata
app.get('/getdatas', async function(req,res){
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        const alldatas = await db.collection('users').find().toArray();
        await connection.close();
        res.json(alldatas);
    } catch (error) {
        res.status(500).json({message : "Server Error"})
    }
})

// View Specific data
app.get('/viewdata/:id', async function(req,res){
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        const viewdata = await db.collection('users').findOne({_id: new mongodb.ObjectId(req.params.id)})
        await connection.close();
        res.json(viewdata);
    } catch (error) {
        res.status(500).json({message : "Server Error"})
    }
})

// Edit Specific data
app.put('/editdata/:id', async function(req,res){
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        const editdata = await db.collection('users').findOneAndUpdate({_id: new mongodb.ObjectId(req.params.id)},{$set:req.body});
        await connection.close();
        res.json(editdata);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
})

// Delete data
app.delete('/deletedata/:id', async function (req,res){
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        const deletedata = await db.collection('users').findOneAndDelete({_id: new mongodb.ObjectId(req.params.id)});
        await connection.close();
        res.json(deletedata);
    } catch (error) {
        res.status(500).json({message : "Server Error"});
    }
})