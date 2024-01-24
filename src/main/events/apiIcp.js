import express from 'express'
import cors from 'cors'
import { Pool } from 'pg'
import searchCodeErrorPg from '../utils/postgresErrorCode'

const app = express()

app.use(express.json())
app.use(cors())

app.on('close', () => {
  console.log('se ha cerrado')
})

function extractBodyData(object) {
  let insertIntoParam = ''
  let insertIntoValue = ''

  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      if (insertIntoParam.length === 0) {
        console.log('jiji1')
        insertIntoParam += `${key}`
        insertIntoValue += `'${object[key]}'`
      } else {
        console.log('jiji2')
        insertIntoParam += `,${key}`
        insertIntoValue += `,'${object[key]}'`
      }
    }
  }
  return { insertIntoParam, insertIntoValue }
}
// insert into peliculas(protagonista,titulo,director,anio_estreno) values('leo','kek','jii',2020)

function connectPgPool() {
  const { projectKey } = global
  const pool = new Pool({
    connectionString: `postgresql://${projectKey.user}:${projectKey.password}@${projectKey.host}:${projectKey.port}/${projectKey.database}`
  })
  return pool
}

function udpateQueryPool(object) {
  let insertIntoParam = ''
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      if (insertIntoParam.length === 0) {
        insertIntoParam += `SET ${key} = '${object[key]}'`
      } else {
        insertIntoParam += `, ${key} = '${object[key]}'`
      }
    }
  }
  return insertIntoParam
}

app.post('/api/:tabla', async (req, res) => {
  const { tabla } = req.params
  try {
    const body = req.body

    const { insertIntoParam, insertIntoValue } = extractBodyData(body)

    const pool = connectPgPool()
    const query = await pool.query(
      `INSERT INTO ${tabla}(${insertIntoParam}) VALUES (${insertIntoValue}) RETURNING *;`
    )

    res.status(200).json({
      data: query.rows[0],
      totalSize: query.rowCount,
      status: 200,
      isError: false,
      query: query.command
    })
  } catch (error) {
    const errorStatus = searchCodeErrorPg(error)
    const { tablesInDB } = global

    const columnsInTable = tablesInDB[tabla].map((i) => ({
      column_name: i.column_name,
      data_type: i.data_type
    }))

    res
      .status(400)
      .json({ error: errorStatus, status: 400, isError: true, hintColumns: columnsInTable })
  }
})

app.put('/api/:tabla/:id', async (req, res) => {
  const { tabla, id } = req.params
  try {
    const body = req.body

    const updatePool = udpateQueryPool(body)

    const pool = connectPgPool()
    const query = await pool.query(`UPDATE ${tabla} ${updatePool} WHERE id=${id} RETURNING *;`)
    res.status(200).json({
      data: query.rows[0],
      totalSize: query.rowCount,
      status: 200,
      isError: false,
      query: query.command
    })
  } catch (error) {
    const errorStatus = searchCodeErrorPg(error)
    const { tablesInDB } = global

    const columnsInTable = tablesInDB[tabla].map((i) => ({
      column_name: i.column_name,
      data_type: i.data_type
    }))

    res
      .status(400)
      .json({ error: errorStatus, status: 400, isError: true, hintColumns: columnsInTable })
  }
})
app.delete('/api/:tabla/:id', async (req, res) => {
  const { tabla, id } = req.params
  try {
    const pool = connectPgPool()
    const query = await pool.query(`DELETE FROM ${tabla} WHERE id=${id};`)

    res.status(200).json({
      status: 200,
      isError: false,
      query: query.command
    })
  } catch (error) {
    const errorStatus = searchCodeErrorPg(error)
    const { tablesInDB } = global

    const columnsInTable = tablesInDB[tabla].map((i) => ({
      column_name: i.column_name,
      data_type: i.data_type
    }))

    res
      .status(400)
      .json({ error: errorStatus, status: 400, isError: true, hintColumns: columnsInTable })
  }
})
app.get('/api/:tabla', async (req, res) => {
  try {
    const { tabla } = req.params
    console.log(global.projectKey)
    const { projectKey } = global
    const pool = new Pool({
      connectionString: `postgresql://${projectKey.user}:${projectKey.password}@${projectKey.host}:${projectKey.port}/${projectKey.database}`
    })
    const query = await pool.query(`SELECT * FROM ${tabla}`)
    res.status(200).json({ command: query.command, data: query.rows, total: query.rowCount })
  } catch (error) {
    console.log(error)
    res.json(error)
  }
})
app.get('/api/:tabla/:id', async (req, res) => {
  try {
    const { tabla, id } = req.params
    // console.log(global.projectKey)
    const { projectKey } = global
    const pool = new Pool({
      connectionString: `postgresql://${projectKey.user}:${projectKey.password}@${projectKey.host}:${projectKey.port}/${projectKey.database}`
    })
    const query = await pool.query(`SELECT * FROM ${tabla} WHERE id=${id}`)
    console.log(query.rows[0])
    res.status(200).json({ command: query.command, data: query.rows[0], total: query.rowCount })
  } catch (error) {
    console.log(error)
    res.json(error)
  }
})
const server = app.listen(3000, () => {
  console.log('firs int')
  server.close()
})

export function stopExpressServer() {
  return new Promise((resolve, reject) => {
    console.log('stop manual server')
    server.close((err) => {
      if (err) {
        reject(err)
      }
      resolve('Pass')
    })
  })
}
server.on('close', () => {
  console.log('cerrao')
})

export function openExpressServer({ port } = {}) {
  return new Promise((resolve, reject) => {
    server
      .listen(port)
      .on('connect', () => resolve('jiji'))
      .on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          return reject('Puerto en uso')
        }
        console.log(err)
        reject(err)
      })
    resolve('jiji')
  })
  // server.listen(3000, () => {
  //   console.log('reanude server')
  // })
}
