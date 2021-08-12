const express = require('express')
const fs = require('fs')

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/',(req,res)=>{

    var jsonData = fs.readFileSync(__dirname+'/data.json')

    // console.log(jsonData)
    jsonData = JSON.parse(jsonData)
    jsonData = jsonData["data"]

    jsonData = fs.readFileSync(__dirname+'/data.json')
    res.status(200).send(jsonData);

})

app.post('/',(req,res)=>{

    var jsonData = fs.readFileSync(__dirname+'/data.json')

    // console.log(req.body)
    jsonData = JSON.parse(jsonData)
    var temp = jsonData
    jsonData = jsonData["data"]

    jsonData.push(req.body)
    temp["data"]=jsonData
    
    fs.writeFileSync(__dirname+'/data.json', JSON.stringify(temp))

    var jsonData = fs.readFileSync(__dirname+'/data.json')
    res.status(201).send(jsonData);

})

app.put('/:id',(req,res)=>{

    var isUpdated = false

    var jsonData = fs.readFileSync(__dirname+'/data.json')

    // console.log(req.body)
    jsonData = JSON.parse(jsonData)
    jsonData = jsonData["data"]
    
    var newJson = []
    jsonData.forEach(item => {
        if(item["id"] != req.params.id)
            newJson.push(item)
        else
            {
                newJson.push(req.body)
                isUpdated = true
            }
    });

    if(isUpdated){
        var temp = {}
        temp["data"]=newJson
    
        fs.writeFileSync(__dirname+'/data.json', JSON.stringify(temp))
        // console.log(req.params)

        var jsonData = fs.readFileSync(__dirname+'/data.json')
        res.status(200).send(jsonData);
    }
    else{
        res.status(404).send("No such data!")
    }
})

app.delete('/:id',(req,res)=>{

    var isDeleted = false

    var jsonData = fs.readFileSync(__dirname+'/data.json')

    // console.log(req.body)
    jsonData = JSON.parse(jsonData)
    jsonData = jsonData["data"]
    
    var newJson = []
    jsonData.forEach(item => {
        if(item["id"] != req.params.id)
            newJson.push(item)
        else
            isDeleted = true
    });

    if(isDeleted){
        var temp = {}
        temp["data"]=newJson
    
        fs.writeFileSync(__dirname+'/data.json', JSON.stringify(temp))
        // console.log(req.params)
        
        var jsonData = fs.readFileSync(__dirname+'/data.json')
        res.status(200).send(jsonData);
    }
    else{
        res.status(404).send("No such data!")
    }
    
})

app.listen(port,()=>{
    console.log("Server is running:"+port)
})