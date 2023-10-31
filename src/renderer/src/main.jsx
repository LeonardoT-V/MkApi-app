import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner'
import { RouterProvider } from 'react-router-dom'
import { router } from './pages'
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
