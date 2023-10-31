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
      `SELECT
      attrelid::regclass AS table_name,
      attname            AS column_name,
      pg_catalog.col_description(attrelid, attnum) as column_comment,
      atttypid::regtype  AS column_datatype
      FROM pg_attribute
      INNER JOIN pg_class ON pg_class.oid = attrelid
      WHERE attrelid IN (
          SELECT pg_class.oid
          FROM pg_class
          INNER JOIN pg_namespace ON pg_namespace.oid = pg_class.relnamespace
          WHERE pg_namespace.nspname IN ('public') AND pg_class.relkind IN ('r', 't')
      )
      AND attnum > 0 AND attisdropped IS FALSE
      ORDER BY pg_class.relname, pg_attribute.attnum`
    )

    rows.map((row) => {
      structObj[row.table_name] = []
    })

    for (const row in structObj) {
      const hola = rows.filter((item) => row === item.table_name)
      structObj[row] = hola
    }
    return structObj
  }

  async createNewTable({ query }) {
    console.log({ query })
  }
}

export default DatabaseIPC
