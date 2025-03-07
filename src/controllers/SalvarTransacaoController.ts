import { Express, Request, Response } from "express";
import SalvarTransacao from "../core/transacao/SalvarTransacao";


export default class SalvarTransacaoController{
    constructor(
        private servidor: Express,
        private casoDeUso: SalvarTransacao,
        ...middleware: any[]
    ){
        const fn = async(req:Request, res: Response) => {
            try{
                const transacao = await this.casoDeUso.executar()
                res.send(transacao)
            } catch{
                res.status(500).send('Erro inesperado')
            }
        }

        servidor.post('/transacoes',middleware, fn)
    }
}