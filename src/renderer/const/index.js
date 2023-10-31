import {
  IconHome,
  IconTable,
  IconDatabaseExport,
  IconServerBolt,
  IconReportAnalytics,
  IconCode
} from '@tabler/icons-react'

export const App_Routes_Links = [
  { path: '/app/home', name: 'home', icon: IconHome },
  { path: '/app/tables', name: 'tables', icon: IconTable, isSub: true },
  { path: '/app/editor', name: 'editor', icon: IconCode },
  { path: '/app/backup', name: 'backup', icon: IconDatabaseExport },
  { path: '/app/data', name: 'data', icon: IconReportAnalytics },
  { path: '/app/api', name: 'api', icon: IconServerBolt }
]

export const Method_Rest_Colors = {
  PUT: 'secondary',
  POST: 'success',
  GET: 'primary',
  DELETE: 'danger',
  SELECT: 'primary',
  CREATE: 'success'
}
