const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = process.env.port || 3000;

//connecting with mongo atlas
const conn_str = 'mongodb+srv://21501a05j5:TA7ZvQSVtlhtwEkr@cluster0.ex05rmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose
.connect(conn_str)
.then(() => console.log("connected to mongo-db successfully"))
.catch((err) => console.log(err));

app.get('/',(req,res) => {
    res.send("Server is running")
});

const schema = new mongoose.Schema({
    id : Number,
    name : String,
    cgpa : Number,
    title : String
});

const db_oper = new mongoose.model("students",schema);

//API calls - get,post,put,delete
app.get("/students",async(req,res)=>{
    let data = await db_oper.find();
    res.send(data);
})

app.use(express.json());

app.post("/students",async(req,res)=>{
    let obj = new db_oper(req.body);
    let result = await obj.save();
    res.send(result);
})

app.put("/students/:id", async(req,res)=>{
    console.log(req.body);
    let u_data = await db_oper.updateOne({
        id : req.params.id
    },
    {
        $set:{
            name : req.body.name,
            cgpa : req.body.cgpa,
            title : req.body.title
        }
    });
    res.send(u_data);
});

app.delete("/students/:id",async(req,res)=>{
    let data = await db_oper.deleteOne({id:req.params.id});
    res.send(data);
})

app.get("/students/:id",async(req,res)=>{
    let data = await db_oper.find({id:req.params.id});
    res.send(data[0]);
})

server = app.listen(port,(error)=>{
    if(error){
        console.log("Server is not able to connect");
    }
    else{
        console.log("Server is listening at http://localhost:"+server.address().port);
    }
})