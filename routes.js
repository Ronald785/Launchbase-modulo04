const express = require('express')
const routes = express.Router()

routes.get("/", function(req, res){
    return res.redirect("instructors")
})

routes.get("/instructors", function(req, res){
    return res.render("instructors/index")
})

routes.get("/instructors/create", function(req, res){
    return res.render("instructors/create")
})

routes.get("/members", function(req, res){
    return res.render("members/index")
})

routes.post("/instructors", function(req, res){
    return res.send("Dados recebidos")
})

module.exports = routes