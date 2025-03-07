import { Request,Response,NextFunction } from "express"
import ColecaoUsuario from "../core/usuario/ColecaoUsuario";
import ProvedorToken from "../core/usuario/ProvedorToken";
import Usuario from "../core/usuario/Usuario";
export default function UsuarioMiddlware(
    colecao: ColecaoUsuario,
    provedorToken: ProvedorToken
){
    return async (req:Request, res: Response, next: NextFunction) => {
       try{
        const token = req.headers.authorization?.replace("Bearer ", "")
        if(!token){
            res.status(403).send('Token inválido')
            return 
    }

    const usuarioToken = provedorToken.validar(token) as Usuario
    const usuario = await colecao.buscarPorEmail(usuarioToken.email)

    if(!usuario){
        res.status(403).send('Usuário não encontrado')
        return
    }


   (req as any).usuario = usuario
    next()
       } catch{
        res.status(403).send('Erro inesperado')
       }
 }
}