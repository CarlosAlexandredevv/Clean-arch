import dotenv from "dotenv";
dotenv.config();

import express from "express";
import RegistrarUsuarioController from "./controllers/RegistrarUsuarioController";
import RegistrarUsuario from "./core/usuario/RegistrarUsuario";
import ColecaoUsuarioDB from "./adapters/db/knex/ColecaoUsuarioDB";
import CriptoReal from "./adapters/auth/CriptoReal";

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const porta = process.env.PORT ?? 3001
app.listen(porta, () =>{
    console.log(`Server is running on port ${porta}`)
})

const colecaoUsuario = new ColecaoUsuarioDB()
const provedorCripto = new CriptoReal()
const registrarUsuario = new RegistrarUsuario(colecaoUsuario, provedorCripto)
new RegistrarUsuarioController(app, registrarUsuario)

