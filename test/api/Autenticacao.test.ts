import axios from 'axios'
import  Usuario  from '../../src/core/usuario/Usuario'

const baseURL = process.env.API_URL

test('Deve registrar um novo usuário se não existir', async () => {

    const usuario : Partial<Usuario> = {
        nome: 'Leticia Estrela',
        email: 'leticia@email.com',
        senha: '123456'
    }
    try{
        const resp = await axios.post(`${baseURL}/registrar`, usuario)
        expect(resp.status).toBe(201)
    } catch(e:any){
        expect(e.response.status).toBe(400)
        expect(e.response.data).toBe('Usuário já existe')
    }
})