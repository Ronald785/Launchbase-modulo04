const fs = require('fs')
//File System do node 
const data = require('./data.json')
const { age, date } = require('./util')

//INDEX
exports.index = function(req, res){
    return res.render("instructors/index", { instructors: data.instructors })
}

//SHOW
exports.show = function (req, res){
    //1º req.query.id na url: /?id=1 || 2º req.body direto do formulário pelo POST
    //3º req.params
    const { id } = req.params
    
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor){
        return res.send("Instructor not found!")
    }

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        //Conversão da data
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
    }


    return res.render("instructors/show", { instructor })
}

//CREATE
exports.post = function(req, res){
    //Validando se todos os dados estão preenchidos
    //Object é um constructor 
    const keys = Object.keys(req.body)

    for( key of keys){
        //res.body.key == "" é uma alternativa 
        if (req.body[key] == ""){
            return res.send("Please, fill all fields!")
        }
    }

    let { avatar_url, birth, name, services, gender } = req.body

    //Convertendo data em milissegundos
    birth = Date.parse(birth) 
    const created_at = Date.now()
    //Criando um id 
    const id = Number(data.instructors.length + 1)

    data.instructors.push({
        id,
        avatar_url, 
        name,
        birth, 
        gender,
        services, 
        created_at
    })
                              //Transformando objeto normal em obj JSON
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) {
            return res.send("Write file error!")
        }
        return res.redirect("/instructors")
    }) 

   // return res.send(req.body)
}

//EDIT
exports.edit = function(req, res){
    const { id } = req.params
    
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor){
        return res.send("Instructor not found!")
    }

    //instructors.birth = 01561516
    //date(instructor.birth)
    //return yyyy-mm-dd

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    date(foundInstructor.birth)

    return res.render("instructors/edit", { instructor })
}

//PUT
exports.put = function(req, res){
    const { id } = req.body
    let index = 0
    
    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
        if (id == instructor.id) {
            index = foundIndex
        }return true
 
    })

    if (!foundInstructor){
        return res.send("Instructor not found!")
    }

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write error!")

        return res.redirect(`/instructors/${id}`)
    })
}

//DELETE 
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredInstructors = data.instructors.filter(function(instructor) {
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")

        return res.redirect("/instructors")
    })
}