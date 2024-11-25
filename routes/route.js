const express = require("express")
const route = express.Router()
const controller = require("../controller/Controller")

route.get("/patientsList",controller.getPatientsList)
route.get("/singleview/:id",controller.getSingleData)
route.get("/authData/:id",controller.getAuthData)

route.post("/register",controller.postRegister)
route.post("/form",controller.postSubmitForm)
route.post("/authorize/:id",controller.postAutorization)


module.exports = route
