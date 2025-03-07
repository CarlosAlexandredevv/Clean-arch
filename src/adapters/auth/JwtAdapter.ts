import ProvedorToken from "../../core/usuario/ProvedorToken";
import jwt from 'jsonwebtoken';

export default class JwtAdapter implements ProvedorToken{
    constructor(private readonly secret: string){}

    gerar(payload: string | object): string{
      return jwt.sign(payload, this.secret, {
            expiresIn: '1d'})
    }

    validar(token: string): string | object{
        return jwt.verify(token, this.secret)
    }
}