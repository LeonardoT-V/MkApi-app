import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner'
import { RouterProvider } from 'react-router-dom'
import { router } from './pages'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <Toaster
        expand={false}
        visibleToasts={1}
        toastOptions={{
          style: { backgroundColor: '#001b1b', color: '#ffffff', border: 'none' }
        }}
      />
      {<RouterProvider router={router} />}
    </NextUIProvider>
  </React.StrictMode>
)
