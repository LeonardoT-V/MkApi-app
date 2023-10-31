import { Pool } from 'pg'
import { decrypt } from '../utils/crypt'

export function createPool(project) {
  // seleccionar el uri
  const cryptedPass = decrypt({ value: project.password })
  const pool = new Pool({
    connectionString: `postgresql://${project.user}:${cryptedPass}@${project.host}:${project.port}/${project.database}`
  })
  pool.on('remove', () => console.log('close pool'))
  return pool
}
