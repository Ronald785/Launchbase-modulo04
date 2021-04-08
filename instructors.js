const fs = require('fs')


//CREATE
exports.post = function(req, res){
    //Validando se todos os dados estão preenchidos
    const keys = Object.keys(req.body)

    for( key of keys){
        //res.body.key == "" é igual ao de baixo
        if (req.body[key] == ""){
            return res.send("Please, fill all fields!")
        }
    }

    fs.writeFile("data.json", JSON.stringify(req.body), function(err){
        if (err) {
            return res.send("Write file error!")
        }
        return res.redirect("/instructors")
    })

    //return res.send(req.body)
}