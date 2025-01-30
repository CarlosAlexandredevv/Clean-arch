import dotenv from "dotenv"
import type { Knex } from "knex"

dotenv.config({ path: "../../../.env" })

const config: Knex.Config = {
  client: "pg",
  connection: process.env.DATABASE_URL || "postgres://admin:admin123@localhost:5432/meubanco",
  migrations: {
    tableName: "knex_migrations"
  }
}

export default config