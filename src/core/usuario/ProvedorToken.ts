export default interface ProvedorToken{
    gerar(payload: string | object): string
}