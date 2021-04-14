const fs = require('fs')
//File System do node 
const data = require('./data.json')

//CREATE
exports.post = function(req, res){
    //Validando se todos os dados estão preenchidos
    const keys = Object.keys(req.body)

    for( key of keys){
        //res.body.key == "" é uma alternativa 
        if (req.body[key] == ""){
            return res.send("Please, fill all fields!")
        }
    }
    //Convertendo data em milissegundos
    req.body.birth = Date.parse(req.body.birth) 
    req.body.created_at = Date.now()

    data.instructors.push(req.body)

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) {
            return res.send("Write file error!")
        }
        return res.redirect("/instructors")
    }) 

   // return res.send(req.body)
}