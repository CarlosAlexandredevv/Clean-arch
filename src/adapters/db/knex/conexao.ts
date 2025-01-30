import knex from "knex"
import config from "../knexfile"
import type { Knex } from "knex"

export default knex(config) as Knex