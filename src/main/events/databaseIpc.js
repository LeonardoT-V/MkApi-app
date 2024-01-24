import { createPool } from '../db'

class DatabaseIPC {
  constructor(app) {
    this.app = app
    this.APPDATA = this.app.getPath('userData') + '/Projects'
  }

  async tablesCreatedDb({ project }) {
    const pool = createPool(project)

    const response = await pool.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema='public'`
    )

    return JSON.stringify(response)
  }

  async columnsCreatedDb({ project, table }) {
    const pool = createPool(project)
    const response = await pool.query(
      `SELECT table_schema, table_name, column_name, data_type, is_nullable, column_default
      --  FROM INFORMATION_SCHEMA.COLUMNS
        --WHERE table_name = ${table}`
    )

    return JSON.stringify(response)
  }

  async allAtributesDatabase({ project }) {
    const pool = createPool(project)
    const structObj = {}

    const { rows } = await pool.query(
      ` SELECT
      *
      FROM
      information_schema.columns
      WHERE
      table_schema = 'public';`
    )

    rows.map((row) => {
      structObj[row.table_name] = []
    })

    for (const row in structObj) {
      const hola = rows.filter((item) => row === item.table_name)
      structObj[row] = hola
    }
    global.tablesInDB = structObj
    return structObj
  }

  async createNewTable({ query }) {
    console.log({ query })
  }
}

export default DatabaseIPC
