
import ColecaoUsuario from "../../core/usuario/ColecaoUsuario"
import Usuario from "../../core/usuario/Usuario"

export default class UsuarioEmMemoria implements ColecaoUsuario{
    private static itens: Usuario[] = []

    async inserir(item: Usuario): Promise<void> {
        UsuarioEmMemoria.itens.push(item)
    }

    async buscarPorEmail(email: string): Promise<Usuario | null> {
       const usuario = UsuarioEmMemoria.itens.find(usuario => usuario.email === email) || null

       return usuario ?? null
    }
}