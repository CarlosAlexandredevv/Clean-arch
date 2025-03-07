import dotenv from "dotenv";
dotenv.config();

import express from "express";
import RegistrarUsuarioController from "./controllers/RegistrarUsuarioController";
import RegistrarUsuario from "./core/usuario/RegistrarUsuario";
import ColecaoUsuarioDB from "./adapters/db/knex/ColecaoUsuarioDB";
import BcryptAdapter from "./adapters/auth/BcryptAdapter";
import LoginUsuario from "./core/usuario/LoginUsuario";
import LoginUsuarioController from "./controllers/LoginUsuarioController";
import JwtAdapter from "./adapters/auth/JwtAdapter";
import SalvarTransacao from "./core/transacao/SalvarTransacao";
import SalvarTransacaoController from "./controllers/SalvarTransacaoController";

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const porta = process.env.PORT ?? 3001
app.listen(porta, () =>{
    console.log(`Server is running on port ${porta}`)
})
const provedorToken = new JwtAdapter(process.env.SECRET! ?? '')
const provedorCripto = new BcryptAdapter()
const colecaoUsuario = new ColecaoUsuarioDB()

const registrarUsuario = new RegistrarUsuario(colecaoUsuario, provedorCripto)
const loginUsuario = new LoginUsuario(colecaoUsuario, provedorCripto, provedorToken)

new RegistrarUsuarioController(app, registrarUsuario)
new LoginUsuarioController(app, loginUsuario)

const salvarTransacao = new SalvarTransacao()
new SalvarTransacaoController(app, salvarTransacao)