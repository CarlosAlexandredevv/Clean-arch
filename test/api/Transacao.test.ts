import axios from "axios";
import { getAutorizationHeader } from "../util/auth";

const baseUrl = process.env.API_URL

test("Deve criar uma transação", async () => {
    const headers = await getAutorizationHeader()
    const resp = await axios.post(`${baseUrl}/transacoes`, {}, headers)
    expect(resp.status).toBe(200)
})