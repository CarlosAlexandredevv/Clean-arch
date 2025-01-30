
import RegistrarUsuario from '../src/core/usuario/RegistrarUsuario';
import BancoEmMemoria from '../src/adapters/db/UsuarioEmMemoria';
import InverterSenha from '../src/adapters/auth/InverterSenha';
import SenhaComEspaco from '../src/adapters/auth/SenhaComEspaco';
import CriptoReal from '../src/adapters/auth/CriptoReal';
import ColecaoUsuarioDB from '../src/adapters/db/knex/ColecaoUsuarioDB';
test('Deve registrar um usuário invertendo a senha', async () => {
    const colecao = new BancoEmMemoria();
    const provedorCripto = new InverterSenha()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto);

    const usuario = await casoDeUso.executar('carlos','carlos@teste.com', '123456');

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('carlos')
    expect(usuario.senha).toBe('654321')
})

test('Deve registrar um usuário com senha com espaços', async () => {
    const colecao = new BancoEmMemoria();
    const provedorCripto = new SenhaComEspaco()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto);

    const usuario = await casoDeUso.executar('carlos1','carlos1@teste.com', '123456');

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('carlos1')
    expect(usuario.senha).toBe('1 2 3 4 5 6')
})

test('Deve registrar um usuário com senha criptografada', async() => {
    const colecao = new BancoEmMemoria();
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto);

    const usuario = await casoDeUso.executar('carlos2','carlos2@teste.com', '123456');

    console.log(usuario.senha)

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('carlos2')
    expect(provedorCripto.comparar("123456", usuario.senha!)).toBeTruthy()
})

test('Deve lançar erro ao cadastrar usuário já cadastrado', async() => {
    const colecao = new BancoEmMemoria();
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto);

    const nome = 'carlos';
    const email = 'carlos@teste.com'
    const senha = '123456'

    await casoDeUso.executar(nome, email, senha);
    const exec = async () => await casoDeUso.executar(nome, email, senha);

    await expect(exec).rejects.toThrow('Usuário já existe')

})

test.skip('Deve registrar um usuário no banco real', async () => {
    const colecao = new ColecaoUsuarioDB();
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto);

    const usuario = await casoDeUso.executar('carlos','carlos@teste.com', '123456');

    console.log(usuario.senha)

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('carlos')
    expect(provedorCripto.comparar("123456", usuario.senha!)).toBeTruthy()
})