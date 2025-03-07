import axios from "axios";

const baseUrl = process.env.API_URL

test("Deve criar uma transação", async () => {
    const resp = await axios.post(`${baseUrl}/transacoes`)
    console.log(resp.data)
    expect(resp.status).toBe(200)
})