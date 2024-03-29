import { Outlet, createHashRouter, defer } from 'react-router-dom'
import CreateProjectPage from './CreateProjectPage'
import TablesCreatedPage from './TablesCreatedPage'
import DetalleTable from './DetalleTabla'
import NavLayout from '../layouts/NavLayout'
import { LOCAL_KEY_PROJECT } from '../env'
import HomePage from './HomePage'
import EditorPage from './EditorPage'
import ApiPage from './ApiPage'
import BackupPage from './BackupPage'
import DataPage from './DataPage'
import 'react-modern-drawer/dist/index.css'
async function fetchDatabase() {
  const store = sessionStorage.getItem(LOCAL_KEY_PROJECT)
  const parse = JSON.parse(store)
  const res = await window.database.allAtributesDatabase({ project: parse.db })
  console.log(res)
  return defer(res)
}

export const router = createHashRouter([
  {
    path: '/',
    element: <CreateProjectPage />
  },
  {
    path: '/app',
    element: (
      <NavLayout>
        <Outlet />
      </NavLayout>
    ),
    loader: fetchDatabase,
    id: 'appRoot',
    children: [
      {
        path: 'home',
        element: <HomePage />
      },
      {
        path: 'tables',
        element: <TablesCreatedPage />
      },
      {
        path: 'api',
        element: <ApiPage />
      },
      {
        path: 'editor',
        element: <EditorPage />
      },
      {
        path: 'backup',
        element: <BackupPage />
      },
      {
        path: 'tables/:nameTable',
        element: <DetalleTable />
      },
      {
        path: 'data',
        element: <DataPage />
      }
    ]
  }
])
