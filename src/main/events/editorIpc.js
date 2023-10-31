import { readFileSync } from 'fs'
import { createPool } from '../db'
import searchCodeErrorPg from '../utils/postgresErrorCode'

class EditorIPC {
  constructor(app) {
    this.app = app
    this.APPDATA = this.app.getPath('userData') + '/Projects'
  }

  async executeSqlCommand({ project, command }) {
    try {
      const pool = createPool(project.db)
      const res = await pool.query(command)
      return JSON.stringify(res)
    } catch (error) {
      const errorStatus = searchCodeErrorPg(error)
      return JSON.stringify({ error: { ...error, ...errorStatus } })
    }
  }

  async executeFileCommand({ project, path }) {
    try {
      const fileQuery = readFileSync(path, { encoding: 'utf-8' })
      const pool = createPool(project.db)
      const res = await pool.query(fileQuery)
      return JSON.stringify({ ...res, queryPassed: fileQuery })
    } catch (error) {
      const errorStatus = searchCodeErrorPg(error)
      return JSON.stringify({ error: { ...error, ...errorStatus } })
    }
  }
}

export default EditorIPC
