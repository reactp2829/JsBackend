import { retry } from '@reduxjs/toolkit/query'
import express from 'express'

const app = express()
const port = 8081

app.use(express.json())

//take input from front end 

let myData = []
let nextId = 1
app.post('/mydata', (req, res)=>{
    const {name, email} = req.body
    //create object here 
    const myDataObj = {id:nextId ++, name, email}
    myData.push(myDataObj)
    res.status(201).send(myDataObj)
})

//to display array 
app.get("/mydata",(req, res)=>{
    res.status(200).send(myData)
})
//for single user data 
app.post("/mydata/:id",(req,res)=>{
    const udata = myData.find(t => t.id === parseInt(req.params.id))
    if(!udata){
       return  res.status(404).send("User data is not found")
    }
    res.status(200).send(udata)
})

//update 
app.put("/mydata/:id",(req, res)=>{
    //find sigle data 
    const singleData = myData.find(mdata => mdata.id === parseInt(req.params.id))
    if(!singleData){
        return res.status(404).send('user is not found')
    }
    const {name, email} = req.body
    singleData.name = name
    singleData.email = email
    res.status(204).send('user data is updated')
})

//delete data 

app.delete("/mydata/:id",(req, res)=>{
    const indexvalue = myData.findIndex(index => index.id === parseInt(req.params.id))
    if(indexvalue === -1){
        return res.status(404).send("data is not found")
    }
    myData.splice(indexvalue,1)
    res.status(204).send("data is deleted")

})

app.listen(port, ()=>{
    console.log(`Server is running on Port : ${port}...`);
    
})